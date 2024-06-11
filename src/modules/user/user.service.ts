import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create.user.dto';
import { CreatedUserDto } from './dto/created.user.dto';

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

    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
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

  async getUser(id: number): Promise<CreatedUserDto> {
    const user = await this.prisma.user.findUnique({
      where: {
        id: id
      }
    });

    if (!user) {
      throw new ConflictException('User not found');
    }

    return {
      name: user.name,
      email: user.email,
      role: user.role
    };
  }

  async getAllUsers(): Promise<CreatedUserDto[]> {
    const users = await this.prisma.user.findMany();

    return users.map(user => ({
      name: user.name,
      email: user.email,
      role: user.role
    }));
  }
}