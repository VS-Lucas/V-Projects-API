import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';

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

    }

}
