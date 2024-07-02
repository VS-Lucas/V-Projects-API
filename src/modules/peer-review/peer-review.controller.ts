import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { PeerReviewService } from './peer-review.service';
import { RegisterPeerReviewDto } from './dto/register-peer-review.dto';
import { ApiBearerAuth, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { AuthenticationGuard } from 'src/guards/authentication.guard';
import { AuthorizationGuard } from 'src/guards/authorization.guard';
import { Role } from 'src/decorators/role.decorator';

// @Role('COLABORADOR')
// @ApiBearerAuth()
// @UseGuards(AuthenticationGuard, AuthorizationGuard)
@ApiTags("Peer Reviews")
@Controller('api/peer-review')
export class PeerReviewController {

    constructor(private readonly peerReviewService: PeerReviewService) {}

    @Get('collaborators/:id')
    async getAllCollaborators(@Param('id') id: number) {

        return this.peerReviewService.getAllCollaborator(+id);

    };

    @Get(':idEvaluator/:idCycle')
    async getAllPeerReviews(
        @Param('idEvaluator') idEvaluator: number, 
        @Param('idCycle') idCycle: number) {

        return this.peerReviewService.getPeerReviewsByCycle(+idEvaluator, +idCycle); 

    };

    @Post('register/:idEvaluator/:idCycle')
    @ApiCreatedResponse({type: [RegisterPeerReviewDto]})
    async registerPeerReview(
      @Param('idEvaluator') idEvaluator: number, 
      @Param('idCycle') idCycle: number,
      @Body() registerPeerReview: RegisterPeerReviewDto[],
    ) {
      return this.peerReviewService.registerPeerReview(registerPeerReview, +idEvaluator, +idCycle);
    }
  }

