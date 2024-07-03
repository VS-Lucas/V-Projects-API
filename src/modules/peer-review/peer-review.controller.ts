import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { PeerReviewService } from './peer-review.service';
import { RegisterPeerReviewDto } from './dto/register-peer-review.dto';
import { ApiBody, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';

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
    // @ApiCreatedResponse({type: [RegisterPeerReviewDto]})
    @ApiBody({type: [RegisterPeerReviewDto]})
    async registerPeerReview(
      @Param('idEvaluator') idEvaluator: number, 
      @Param('idCycle') idCycle: number,
      @Body() registerPeerReview: RegisterPeerReviewDto[],
    ) {
      return this.peerReviewService.registerPeerReview(registerPeerReview, +idEvaluator, +idCycle);
    }
  }

