import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class HistoryService {

    constructor(private prisma: PrismaService) {}

    async getHistory(id : number) {

        const userExist = await this.prisma.user.findUnique({
            where: {
                id: id 
            }
        })

        if (!userExist) throw new NotFoundException(`User with ID ${id} not found`);

        const selfAssessment = await this.prisma.selfAssessment.findMany({
            where: {
                userId: id
            }, 
            include: {
                cycle: true, 
                SelfAssessmentScores: true 
            }
        });

        const peerReview = await this.prisma.peerReview.findMany({
            where: {
                evaluatorId: id
            }, 
            include: {
                cycle: true, 
                PeerReviewScores: true 
            }
        });

    return [selfAssessment, peerReview];

    }

}
