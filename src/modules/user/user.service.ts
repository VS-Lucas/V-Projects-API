import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create.user.dto';
import { CreatedUserDto } from './dto/created.user.dto';

export const roundsOfHashing = 10;

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) { }

  async create(createUserDto: CreateUserDto): Promise<CreatedUserDto> {

    const existingUser= await this.prisma.user.findUnique({
      where: {
        email: createUserDto.email
      }
    })

    if (existingUser) {
      throw new ConflictException('A user already exists for this email');
    }

    const hashedPassword = await bcrypt.hash(createUserDto.password, roundsOfHashing);
    createUserDto.password = hashedPassword;

    const user = await this.prisma.user.create({
      data: createUserDto,
    });

    return {
      name: user.name,
      email: user.email,
      role: user.role
    };
  }
}