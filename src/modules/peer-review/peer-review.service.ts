import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { RegisterPeerReviewDto } from './dto/create-peer-review.dto';

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

    async registerPeerReview(registerPeerReview: RegisterPeerReviewDto[]) {
        for (const review of registerPeerReview) {
            const existingReview = await this.reviewExist(review.evaluatorId, review.evaluatedId, review.cycleId);
            console.log(existingReview);

            if (!existingReview) {
                await this.createPeerReview(review);
            } else {
                const peerReviewScoreId = existingReview.PeerReviewScores ? existingReview.PeerReviewScores.id : null;
                await this.updatePeerReview(existingReview.id, peerReviewScoreId, review);
            }
        }
    };

    async createPeerReview(reagisterPeerReview: RegisterPeerReviewDto) {
        const peerReview = await this.prisma.peerReview.create({
            data: {
                evaluator: {
                    connect: {
                        id: reagisterPeerReview.evaluatorId
                    }
                },
                evaluated: {
                    connect: {
                        id: reagisterPeerReview.evaluatedId
                    }
                },
                cycle: {
                    connect: {
                        id: reagisterPeerReview.cycleId
                    }
                },
                meanGrade: (reagisterPeerReview.assessment.behavior + reagisterPeerReview.assessment.tecniques) / 2
            }
        });

        await this.prisma.peerReviewScore.create({
            data: {
                assessment: {
                    connect: {
                        id: peerReview.id
                    }
                },
                behavior: reagisterPeerReview.assessment.behavior,
                tecniques: reagisterPeerReview.assessment.tecniques,
                toImprove: reagisterPeerReview.assessment.toImprove,
                toPraise: reagisterPeerReview.assessment.toPraise
            }
        });
    }

    async updatePeerReview(idPeerReview: number, idScore: number | null, registerPeerReview: RegisterPeerReviewDto) {
        await this.prisma.peerReview.update({
            where: {
                id: idPeerReview
            },
            data: {
                meanGrade: (registerPeerReview.assessment.behavior + registerPeerReview.assessment.tecniques) / 2
            }
        });

        if (idScore !== null) {
            await this.prisma.peerReviewScore.update({
                where: {
                    id: idScore
                },
                data: {
                    behavior: registerPeerReview.assessment.behavior,
                    tecniques: registerPeerReview.assessment.tecniques,
                    toImprove: registerPeerReview.assessment.toImprove,
                    toPraise: registerPeerReview.assessment.toPraise
                }
            });
        } else {
            await this.prisma.peerReviewScore.create({
                data: {
                    assessment: {
                        connect: {
                            id: idPeerReview
                        }
                    },
                    behavior: registerPeerReview.assessment.behavior,
                    tecniques: registerPeerReview.assessment.tecniques,
                    toImprove: registerPeerReview.assessment.toImprove,
                    toPraise: registerPeerReview.assessment.toPraise
                }
            });
        }
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

    async reviewExist(idEvaluator: number, idEvaluated: number, idCycle: number) {
        const review = await this.prisma.peerReview.findFirst({
            where: {
                evaluatedId: idEvaluated,
                evaluatorId: idEvaluator,
                cycleId: idCycle
            },
            include: {
                PeerReviewScores: true
            }
        })
        return review;
    }
}
