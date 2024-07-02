import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { RegisterPeerReviewDto } from './dto/register-peer-review.dto';

@Injectable()
export class PeerReviewService {
    constructor(private prisma: PrismaService) {}

    async getAllCollaborator(userId: number) {
        const collaborators = await this.prisma.user.findMany({
            where: {
                AND: [
                    {
                        id: {
                            not: userId,
                        },
                    },
                    {
                        role: 'COLABORADOR',
                    },
                ],
            },
        });

        return collaborators;
    }

    async registerPeerReview(registerPeerReview: RegisterPeerReviewDto[], evaluatorId: number, cycle: number) {

        const missingReviews = await this.verify(evaluatorId,  cycle, registerPeerReview) 

        // console.log("Registros")
        // console.log(registerPeerReview)

        // console.log("reviews sobrando")
        // console.log(missingReviews)

        missingReviews.forEach((missingReview) => {

            console.log(missingReview)
            console.log(" ")

            this.deletePeerReview(missingReview.id, missingReview.PeerReviewScores.id)

        })

        for (const review of registerPeerReview) {
            const evaluatorExists = await this.prisma.user.findUnique({
                where: { id: review.evaluatorId },
            });

            if (!evaluatorExists) {
                throw new NotFoundException('Evaluator user not found');
            }

            const evaluatedExists = await this.prisma.user.findUnique({
                where: { id: review.evaluatedId },
            });

            if (!evaluatedExists) {
                throw new NotFoundException('Evaluated user not found');
            }

            const cycleExists = await this.prisma.cycle.findUnique({
                where: { id: review.cycleId },
            });

            if (!cycleExists) {
                throw new NotFoundException('Cycle not found');
            }

            const existingReview = await this.reviewExist(review.evaluatorId, review.evaluatedId, review.cycleId);

            const isFinished = this.isFinished(review)

            if (!existingReview) {
                await this.createPeerReview(review, isFinished);

            } else {
                const peerReviewScoreId = existingReview.PeerReviewScores ? existingReview.PeerReviewScores.id : null;
                await this.updatePeerReview(existingReview.id, peerReviewScoreId, review, isFinished);
            }
        }
    }

    async createPeerReview(registerPeerReview: RegisterPeerReviewDto, isFinished) {
        const evaluatorExists = await this.prisma.user.findUnique({
            where: { id: registerPeerReview.evaluatorId },
        });

        if (!evaluatorExists) {
            throw new NotFoundException('Evaluator user not found');
        }

        const evaluatedExists = await this.prisma.user.findUnique({
            where: { id: registerPeerReview.evaluatedId },
        });

        if (!evaluatedExists) {
            throw new NotFoundException('Evaluated user not found');
        }

        const cycleExists = await this.prisma.cycle.findUnique({
            where: { id: registerPeerReview.cycleId },
        });

        if (!cycleExists) {
            throw new NotFoundException('Cycle not found');
        }

        const peerReview = await this.prisma.peerReview.create({
            data: {
                evaluator: {
                    connect: {
                        id: registerPeerReview.evaluatorId,
                    },
                },
                evaluated: {
                    connect: {
                        id: registerPeerReview.evaluatedId,
                    },
                },
                cycle: {
                    connect: {
                        id: registerPeerReview.cycleId,
                    },
                },
                meanGrade: (registerPeerReview.assessment.behavior + registerPeerReview.assessment.tecniques) / 2,
                isFinished: isFinished
                
            },
        });

        await this.prisma.peerReviewScore.create({
            data: {
                assessment: {
                    connect: {
                        id: peerReview.id,
                    },
                },
                behavior: registerPeerReview.assessment.behavior,
                tecniques: registerPeerReview.assessment.tecniques,
                toImprove: registerPeerReview.assessment.toImprove,
                toPraise: registerPeerReview.assessment.toPraise,
            },
        });
    }

    async updatePeerReview(idPeerReview: number, idScore: number | null, registerPeerReview: RegisterPeerReviewDto, isFinished) {
        const peerReviewExists = await this.prisma.peerReview.findUnique({
            where: { id: idPeerReview },
        });

        if (!peerReviewExists) {
            throw new NotFoundException('PeerReview not found');
        }

        await this.prisma.peerReview.update({
            where: {
                id: idPeerReview,
            },
            data: {
                meanGrade: (registerPeerReview.assessment.behavior + registerPeerReview.assessment.tecniques) / 2,
                isFinished: isFinished
            },
        });

        if (idScore !== null) {
            await this.prisma.peerReviewScore.update({
                where: {
                    id: idScore,
                },
                data: {
                    behavior: registerPeerReview.assessment.behavior,
                    tecniques: registerPeerReview.assessment.tecniques,
                    toImprove: registerPeerReview.assessment.toImprove,
                    toPraise: registerPeerReview.assessment.toPraise,
                },
            });
        } else {
            await this.prisma.peerReviewScore.create({
                data: {
                    assessment: {
                        connect: {
                            id: idPeerReview,
                        },
                    },
                    behavior: registerPeerReview.assessment.behavior,
                    tecniques: registerPeerReview.assessment.tecniques,
                    toImprove: registerPeerReview.assessment.toImprove,
                    toPraise: registerPeerReview.assessment.toPraise,
                },
            });
        }
    }

    async getPeerReviewsByCycle(evaluatorId: number, cycleId: number) {
        const reviews = await this.prisma.peerReview.findMany({
            where: {
                evaluatorId: evaluatorId,
                cycleId: cycleId,
            },
            include: {
                PeerReviewScores: true,
            },
        });
        return reviews;
    }

    async reviewExist(idEvaluator: number, idEvaluated: number, idCycle: number) {
        const review = await this.prisma.peerReview.findFirst({
            where: {
                evaluatedId: idEvaluated,
                evaluatorId: idEvaluator,
                cycleId: idCycle,
            },
            include: {
                PeerReviewScores: true,
            },
        });
        return review;
    }

    async deletePeerReview(idPeerReview: number, idScore: number) {

        await this.prisma.peerReviewScore.delete({

            where: {
                id: idScore
            }

        })

        await this.prisma.peerReview.delete({

            where: {

                id: idPeerReview 

            }

        })

    }

    async verify(evaluatorId: number, cycleId: number, registerPeerReviewList: RegisterPeerReviewDto[]) {
        const actualReviews = await this.getPeerReviewsByCycle(evaluatorId, cycleId);

        // console.log(actualReviews)
    
        const missingReviews = actualReviews.filter(record => {
            const foundReview = registerPeerReviewList.find(review => 
                record.evaluatedId === review.evaluatedId && record.evaluatorId === review.evaluatorId
            );
    
            return !foundReview; 
        });
    
        return missingReviews;
    }

    async isFinished(review: RegisterPeerReviewDto) {

        if (review.assessment.behavior == null || review.assessment.tecniques == null || review.assessment.toImprove == null ||
            review.assessment.toPraise == null) {

                return true; 

            }else {

                return false 

            }
        

    };
    
}
