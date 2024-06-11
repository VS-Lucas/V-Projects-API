import { Injectable } from '@nestjs/common';
import { CreateSelfAssesmentDto } from './dto/create-self-assesment.dto';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class SelfAssesmentService {

  constructor(private prisma: PrismaService) { }

  async create(createSelfAssesmentDto: CreateSelfAssesmentDto) {
    const selfAssesment = await this.prisma.selfAssessment.create({
      data: {
        user: {
          connect: {
            id: createSelfAssesmentDto.userId
          }
        },
        cycle: {
          connect: {
            id: createSelfAssesmentDto.cycleId
          }
        },
        date: new Date(),
        meanGrade: 0
      },
      include: {
        cycle: true
      }
    });

    let totalScore = 0;
    for (const score of createSelfAssesmentDto.scores) {
      await this.prisma.selfAssessmentScore.create({
        data: {
          selfAssessment: {
            connect: {
              id: score.selfAssessmentId
            }
          },
          criterion: {
            connect: {
              id: score.criterionId
            }
          },
          grade: score.grade,
          justification: score.justification
        }
      });
      totalScore += score.grade
    }

    const meanGrade = totalScore / createSelfAssesmentDto.scores.length;
    await this.prisma.selfAssessment.update({
      where: {
        id: selfAssesment.id,
      },
      data: {
        meanGrade: meanGrade
      }
    })

    return selfAssesment;

  }

  // findAll() {
  //   return `This action returns all selfAssesment`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} selfAssesment`;
  // }

  // update(id: number, updateSelfAssesmentDto: UpdateSelfAssesmentDto) {
  //   return `This action updates a #${id} selfAssesment`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} selfAssesment`;
  // }
}
