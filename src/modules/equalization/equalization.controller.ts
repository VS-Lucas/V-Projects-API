import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { EqualizationService } from './equalization.service';
import { CreateEqualizationDto } from './dto/create-equalization.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Role } from 'src/decorators/role.decorator';
import { AuthenticationGuard } from 'src/guards/authentication.guard';
import { AuthorizationGuard } from 'src/guards/authorization.guard';

@Role('SOCIO')
@ApiBearerAuth()
@UseGuards(AuthenticationGuard, AuthorizationGuard)
@Controller('api/equalization')
@ApiTags('Equalization')
export class EqualizationController {
    constructor(private readonly equalizationService: EqualizationService) {}

    @Post()
    create(@Body() createEqualizationDto: CreateEqualizationDto) {
        return this.equalizationService.create(createEqualizationDto);
    }

    @Get('/all')
    findAll() {
        return this.equalizationService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.equalizationService.findOne(+id);
    }

    @Get('evaluator/:evaluatorId')
    findByEvaluator(@Param('evaluatorId') evaluatorId: string) {
        return this.equalizationService.findByEvaluator(+evaluatorId);
    }

    @Get('evaluated/:evaluatedId')
    findByEvaluated(@Param('evaluatedId') evaluatedId: string) {
        return this.equalizationService.findByEvaluated(+evaluatedId);
    }

    @Get('cycle/:cycleId')
    findByCycle(@Param('cycleId') cycleId: string) {
        return this.equalizationService.findByCycle(+cycleId);
    }


    @Patch(':id')
    update(@Param('id') id: string, @Body() updateEqualizationDto: any) {
        return this.equalizationService.editEqualization(+id, updateEqualizationDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.equalizationService.deleteEqualization(+id);
    }

    @Get()
    getClosestCycleId() {
        return this.equalizationService.findClosestCycleId();
    }

    @Get('/user/:userId')
    getEqualizationsByUser(@Param('userId') userId: string) {
        return this.equalizationService.findEqualizationIdByUserId(+userId);
    }

    @Get(':userId/:evaluatedId')
    getEqualizationByUserAndEvaluated(@Param('userId') userId: string, @Param('evaluatedId') evaluatedId: string) {
        return this.equalizationService.findEqualizationByEvaluatorAndEvaluated(+userId, +evaluatedId);
    }

}
