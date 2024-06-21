import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { PeerReviewService } from './peer-review.service';
import { RegisterPeerReviewDto } from './dto/register-peer-review.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags("Peer Reviews")
@Controller('peer-review')
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

    @Put('register/:idEvaluator/:idCycle')
    async registerPeerReview(
      @Param('idEvaluator') idEvaluator: number, 
      @Param('idCycle') idCycle: number,
      @Body() registerPeerReview: RegisterPeerReviewDto[],
    ) {
      return this.peerReviewService.registerPeerReview(registerPeerReview, +idEvaluator, +idCycle);
    }
  }

