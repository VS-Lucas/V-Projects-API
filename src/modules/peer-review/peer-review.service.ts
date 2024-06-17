import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { CreatePeerReviewDto } from './dto/create-peer-review.dto';

@Injectable()
export class PeerReviewService {

    constructor(private prisma: PrismaService) {}

    async getAllCollaborator(userId : number) {

        const collaborator = this.prisma.user.findMany({

            where: {

                AND: [
                    {
                        id : {
                            not: userId
                        }
                    },
                    {
                        role: "COLABORADOR"
                    }
                ]

            }

        })

        return collaborator;

    };

    async registerPeerReview(idPeekReview: number, registerPeerReview: CreatePeerReviewDto[]) {

        for (const review of registerPeerReview) {

            const reviewExist = this.reviewExist(idPeekReview);

            if (!reviewExist) {

                this.createPeerReview(review)

            }else {

                this.updatePeerReview((await reviewExist).id, (await reviewExist).PeerReviewScores.id, review)

            }

        }


    };

    async createPeerReview(createPeerReview: CreatePeerReviewDto) {

        await this.prisma.peerReview.create({

            data: {

                evaluator: {

                    connect: {

                        id: createPeerReview.evaluatorId

                    }

                },

                evaluated: {

                    connect: {

                        id: createPeerReview.evaluatedId

                    }

                },

                cycle: {

                    connect: {

                        id: createPeerReview.cycleId

                    }

                }, 

                meanGrade: (createPeerReview.assessment.behavior + createPeerReview.assessment.tecniques)/2

            }

        })

        await this.prisma.peerReviewScore.create({

            data: {

                assessment: {

                    connect: {

                        id: createPeerReview.assessment.idReview

                    }

                }, 

                behavior: createPeerReview.assessment.behavior,

                tecniques: createPeerReview.assessment.tecniques, 

                toImprove: createPeerReview.assessment.toImprove,
                
                toPraise: createPeerReview.assessment.toPraise

            }

        })

    };

    async updatePeerReview(idPeerReview: number, idScore: number, createPeerReview: CreatePeerReviewDto) {

        await this.prisma.selfAssessment.update({

            where: {

                id: idPeerReview

            }, 

            data: {

                meanGrade: (createPeerReview.assessment.behavior + createPeerReview.assessment.tecniques) / 2

            }

        })

        await this.prisma.peerReviewScore.update({

            where: {

                id: idScore

            }, 

            data: {

                behavior: createPeerReview.assessment.behavior,
    
                tecniques: createPeerReview.assessment.tecniques, 

                toImprove: createPeerReview.assessment.toImprove,
                
                toPraise: createPeerReview.assessment.toPraise

            }

        })

    }

    async getPeerReviews(evaluatorId: number, cycleId: number) {

        const reviews = await this.prisma.peerReview.findMany({

            where: {

                evaluatorId: evaluatorId,
                cycleId: cycleId

            }, 
            include: {

                PeerReviewScores: true

            }

        })

        return reviews;

    }

    async reviewExist(id: number) {

        const review = await this.prisma.peerReview.findUnique({

            where: {

                id: id

            }, 
            include: {

                PeerReviewScores: true 

            }

        })

        return review; 

    }

}
