import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSelfAssesmentDto } from './dto/create-self-assesment.dto';
import { PrismaService } from 'src/database/prisma.service';
import { UpdateSelfAssesmentDto } from './dto/update-self-assesment.dto';

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

  async findAll() {
    const selfAssessments = await this.prisma.selfAssessment.findMany({
      include: {
        user: true,
        cycle: true,
        SelfAssessmentScores: true
      }
    });
    return selfAssessments;
  }

  async findOne(id: number) {
    const selfAssessment = await this.prisma.selfAssessment.findUnique({
      where: { id },
      include: {
        user: true,
        cycle: true,
        SelfAssessmentScores: true
      }
    });
    return selfAssessment;
  }

  async update(id: number, updateSelfAssessmentDto: UpdateSelfAssesmentDto) {
    const existingSelfAssessment = await this.prisma.selfAssessment.findUnique({ where: { id } });

    if (!existingSelfAssessment) {
      throw new NotFoundException(`Self assessment with ID ${id} not found`);
    }

    if (updateSelfAssessmentDto.scores) {
      await this.prisma.selfAssessmentScore.deleteMany({
        where: { selfAssessmentId: id }
      });

    let totalScore = 0;
    for (const score of updateSelfAssessmentDto.scores) {
      await this.prisma.selfAssessmentScore.create({
        data: {
          selfAssessment: {
            connect: {id }
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
      const meanGrade = totalScore / updateSelfAssessmentDto.scores.length;
      return await this.prisma.selfAssessment.update({
      where: {
        id: id,
      },
      data: {
        meanGrade: meanGrade
      }
    })
    }
  }

  // para atualizarr
//   {
//     "userId": 1,
//     "cycleId": 1,
//     "scores": [
//         {
//             "selfAssessmentId": 1,
//             "criterionId": 1,
//             "grade": 9,
//             "justification": "Bom desempenho na tarefa."
//         },
//         {
//             "selfAssessmentId": 1,
//             "criterionId": 2,
//             "grade": 8,
//             "justification": "Poderia melhorar na comunicação com a equipe."
//         }
//     ]
// }


  // remove(id: number) {
  //   return `This action removes a #${id} selfAssesment`;
  // }
}
