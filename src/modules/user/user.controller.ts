import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { ApiBearerAuth, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create.user.dto';
import { CreatedUserDto } from './dto/created.user.dto';
import { Role } from 'src/decorators/role.decorator';
import { AuthenticationGuard } from 'src/guards/authentication.guard';
import { AuthorizationGuard } from 'src/guards/authorization.guard';
import { Collaborator } from './dto/collaborator.dto';

@ApiBearerAuth()
@UseGuards(AuthenticationGuard)
@Controller('api/user')
@ApiTags('User')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @UseGuards(AuthorizationGuard)
  @Role('SOCIO')
  @Post()
  @ApiCreatedResponse({ type: CreatedUserDto })
  async create(@Body() createUserDto: CreateUserDto): Promise<CreatedUserDto> {
    return this.userService.create(createUserDto);
  }

  @Get('/all')
  async getAllUsers(): Promise<CreatedUserDto[]> {
    return this.userService.getAllUsers();
  }

  @Get('/all-collabs')
  async getAllColabs(): Promise<Collaborator[]> {
    return this.userService.getAllColabs();
  }

  @Get(':id')
  async getUser(@Param('id') id: number): Promise<CreatedUserDto> {
    return this.userService.getUser(+id);
  }
}