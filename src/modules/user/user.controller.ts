import {
  Controller,
  Post,
  Body,
  Get,
  Param,
} from '@nestjs/common';
import { UserService } from './user.service';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create.user.dto';
import { CreatedUserDto } from './dto/created.user.dto';

@Controller('api/user')
@ApiTags('User')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post()
  @ApiCreatedResponse({ type: CreatedUserDto })
  async create(@Body() createUserDto: CreateUserDto): Promise<CreatedUserDto> {
    return this.userService.create(createUserDto);
  }

  @Get(':id')
  async getUser(@Param('id') id: number): Promise<CreatedUserDto> {
    return this.userService.getUser(id);
  }

  @Get()
  async getAllUsers(): Promise<CreatedUserDto[]> {
    return this.userService.getAllUsers();
  }
}