import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { PeerReviewService } from './peer-review.service';
import { CreatePeerReviewDto } from './dto/create-peer-review.dto';

@Controller('peer-review')
export class PeerReviewController {

    constructor(private readonly peerReviewService: PeerReviewService) {}

    @Get('collaborators/:id')
    async getAllCollaborators(@Param('id') id: number) {

        return this.peerReviewService.getAllCollaborator(id);

    };

    @Get(':idReview/:idCycle')
    async getAllPeerReviews(
        @Param('idReview') idReview: number, 
        @Param('idCycle') idCycle: number,) {

        return this.peerReviewService.getPeerReviews(idReview, idCycle); 

    };

    @Put('register/:id')
    async registerPeerReview(
      @Param('id') idPeekReview: number,
      @Body() registerPeerReview: CreatePeerReviewDto[],
    ) {
      return this.peerReviewService.registerPeerReview(idPeekReview, registerPeerReview);
    }
  }

