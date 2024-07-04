import { Injectable, ConflictException, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { CreateEqualizationDto } from './dto/create-equalization.dto';
import { UpdateEqualizationDto } from './dto/update-equalization.dto';
import { SelfAssesmentService } from '../self-assesment/self-assesment.service';
import { CreatedCycleEqualizationDto } from '../cycles-equalization/dto/created.cycleEqualization.dto';
import { CyclesEqualizationService } from '../cycles-equalization/cycles-equalization.service';

@Injectable()
export class EqualizationService {
  constructor(
    private prisma: PrismaService,
    private readonly selfAssesmentService: SelfAssesmentService,
    private readonly cyclesEqualizationService: CyclesEqualizationService
  ) {}

  async create(createEqualizationDto: CreateEqualizationDto) {
    const existingEqualization = await this.prisma.equalization.findFirst({
      where: {
        evaluatorId: createEqualizationDto.evaluatorId,
        evaluatedId: createEqualizationDto.evaluatedId,
        cycleId: createEqualizationDto.cycleId,
      },
    });

    if (existingEqualization) {
      throw new ConflictException('Equalization already exists for this evaluator, evaluated, and cycle combination');
    }

    const equalization = await this.prisma.equalization.create({
      data: {
        evaluator: {
          connect: {
            id: createEqualizationDto.evaluatorId
          }
        },
        evaluated: {
          connect: {
            id: createEqualizationDto.evaluatedId
          }
        },
        cycle: {
          connect: {
            id: createEqualizationDto.cycleId
          }
        },
        cycleEqualization: {
          connect: {
            id: createEqualizationDto.cycleId
          }
        },
        date: new Date(),
        finalGrade: 0
      },
      include: {
        cycle: true
      }
    });

    let totalScore = 0;
    for (const score of createEqualizationDto.scores) {
      await this.prisma.equalizationScore.create({
        data: {
          equalization: {
            connect: {
              id: equalization.id
            }
          },
          criterion: {
            connect: {
              id: score.criterionId
            }
          },
          grade: score.grade
        }
      });
      totalScore += score.grade
    }

    const meanGrade = totalScore / createEqualizationDto.scores.length;
    await this.prisma.equalization.update({
      where: {
        id: equalization.id,
      },
      data: {
        finalGrade: meanGrade
      }
    })

    return equalization;
  }

  async findAll() {
    const equalizations = await this.prisma.equalization.findMany();
    // const scores = await this.prisma.equalizationScore.findMany();
    // const selfAssessment = await this.selfAssesmentService.findAll();

    // const mappedEqualizations = equalizations.map(equalization => {
    
    //   const equalizationScoresForEqualization = scores.filter(scores => scores.equalizationId === equalization.id);
      
    //   const criteriaScores = {};

    //   equalizationScoresForEqualization.forEach(score => {
    //     if (!criteriaScores[score.criterionId]) {
    //       criteriaScores[score.criterionId] = {
    //         equalizationScores: [],
    //         selfAssessmentScores: [],
    //       };
    //     }
    //     criteriaScores[score.criterionId].equalizationScores.push(score);
    //   });
      
    //   const selfAssessmentScoresForEqualization = selfAssessment.filter(
    //     selfAssessment => selfAssessment.cycle.id === equalization.cycleId &&
    //                       selfAssessment.user.id === equalization.evaluatedId
    //   );

    //   selfAssessmentScoresForEqualization.forEach(score => {
    //     score.SelfAssessmentScores.forEach(selfAssessmentScore => {
    //       const criterionId = selfAssessmentScore.criterionId;
      
    //       if (!criteriaScores[criterionId]) {
    //         criteriaScores[criterionId] = {
    //           equalizationScores: [],
    //           selfAssessmentScores: [],
    //         };
    //       }
      
    //       criteriaScores[criterionId].selfAssessmentScores.push(selfAssessmentScore);
    //     });
    //   });

    //   return {
    //     criteriaScores,
    //   };
    // })
    // return mappedEqualizations;
    return equalizations;
  
  }

  

  async findOne(id: number){
    const equalization = await this.prisma.equalization.findUnique({
      where: { id },
    });

    if (!equalization) {
      throw new ConflictException('Equalization not found');
    }

    const scores = await this.prisma.equalizationScore.findMany({
      where: {
        equalizationId: equalization.id
      },
      include: {
        criterion: true
      }
    });
    
      const selfAssessment = await this.selfAssesmentService.findByUserIdAndCycle(equalization.evaluatedId, equalization.cycleId );

      const criteriaScores = {};

      scores.forEach(score => {
          if (!criteriaScores[score.criterionId]) {
            criteriaScores[score.criterionId] = {
              equalizationScores: [],
              selfAssessmentScores: [],
            };
          }
          criteriaScores[score.criterionId].equalizationScores.push(score);
        });

        selfAssessment.forEach(score => {
          score.SelfAssessmentScores.forEach(selfAssessmentScore => {
            const criterionId = selfAssessmentScore.criterionId;
        
            if (!criteriaScores[criterionId]) {
              criteriaScores[criterionId] = {
                equalizationScores: [],
                selfAssessmentScores: [],
              };
            }
        
            criteriaScores[criterionId].selfAssessmentScores.push(selfAssessmentScore);
          });
        });

      return {
        criteriaScores,
      };
  }

  async findEqualizationIdByUserId(userId: number) {

    try {
      const currentCycle = await this.cyclesEqualizationService.getCurrentCycleId();
      const selfAssessment = await this.prisma.selfAssessment.findFirst({
        where: {
          userId: userId,
          cycleId: currentCycle
        }
      });

      if (!selfAssessment) {
        
        console.log(`Self assessment for user ${userId} in cycle ${currentCycle} not found`);
        return 0;
      }

      return selfAssessment.id;
    } catch (error) {
        throw new InternalServerErrorException('Something went wrong while finding the self-assessment');
        
    }
  }

  async findClosestCycleId() {
    const lastCycle = await this.prisma.cycle.findFirst({
      orderBy: {
        endDate: 'desc',
      },
    });

    if (!lastCycle) {
      throw new ConflictException('No cycles found');
    }

    return lastCycle.id;
  }

  async findByEvaluator(evaluatorId: number) {
        return await this.prisma.equalization.findMany({
        where: { evaluatorId },
        });
    
    }

  async findByEvaluated(evaluatedId: number){
        return await this.prisma.equalization.findMany({
        where: { evaluatedId },
        });
    
    }

  async findByCycle(cycleId: number) {
        return await this.prisma.equalization.findMany({
        where: { cycleId },
        });
    
    }

  async editEqualization(id: number, updateEqualizationDto: UpdateEqualizationDto){
        await this.prisma.equalization.update({
            where: { id },
            data: {
              evaluator: {
                connect: {
                  id: updateEqualizationDto.evaluatorId
                }
              },
              evaluated: {
                connect: {
                  id: updateEqualizationDto.evaluatedId
                }
              },
              cycle: {
                connect: {
                  id: updateEqualizationDto.cycleId
                }
              },
              date: new Date(updateEqualizationDto.date),
            },
        });

        await this.prisma.equalizationScore.deleteMany({
          where: {
            equalizationId: id
          }
        });

        let totalScore = 0;
        for (const score of updateEqualizationDto.scores) {
          await this.prisma.equalizationScore.create({
            data: {
              equalization: {
                connect: {
                  id: id
                }
              },
              criterion: {
                connect: {
                  id: score.criterionId
                }
              },
              grade: score.grade
            }
          });
          totalScore += score.grade;
        }
        const meanGrade = totalScore / updateEqualizationDto.scores.length;

        const updatedEqualization = await this.prisma.equalization.update({
          where: {
            id: id,
          },
          data: {
            finalGrade: meanGrade,
          }
        });

        return updatedEqualization;
    }

  async deleteEqualization(id: number){
        await this.prisma.equalizationScore.deleteMany({
            where: {
              equalizationId: id
            }
        });

        await this.prisma.equalization.delete({
            where: { id },
        });
    }
}
