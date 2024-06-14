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

    async createPeerReview(createPeerReview: CreatePeerReviewDto[]) {

        for (const review of createPeerReview) {

            await this.prisma.peerReview.create({

                data: {
    
                    evaluator: {
    
                        connect: {
    
                            id: review.evaluatorId
    
                        }
    
                    },
    
                    evaluated: {
    
                        connect: {
    
                            id: review.evaluatedId
    
                        }
    
                    },
    
                    cycle: {
    
                        connect: {
    
                            id: review.cycleId
    
                        }
    
                    }, 
    
                    meanGrade: (review.assessment.behavior + review.assessment.tecniques)/2
    
                }
    
            })

            await this.prisma.peerReviewScore.create({

                data: {

                    assessment: {

                        connect: {

                            id: review.assessment.idReview

                        }

                    }, 

                    behavior: review.assessment.behavior,

                    tecniques: review.assessment.tecniques, 

                    toImprove: review.assessment.toImprove,
                    
                    toPraise: review.assessment.toPraise

                }

            })

        }


    };

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

    async findReview(evaluatedID: number, cycleId: number) {

        const review = await this.prisma.peerReview.findFirst({

            where : {

                evaluatedId: evaluatedID, 
                cycleId: cycleId

            }

        })

        if (review) {
            return true 
        }else {
            return false
        }

    }

}
