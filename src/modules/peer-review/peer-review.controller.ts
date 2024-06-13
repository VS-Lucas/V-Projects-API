import { Controller, Get, Param } from '@nestjs/common';
import { PeerReviewService } from './peer-review.service';

@Controller('peer-review')
export class PeerReviewController {

    constructor(private readonly peerReviewService: PeerReviewService) {}

    @Get(':id')
    getAllCollaborator(@Param('id') id: string) {

        const collaborator = this.peerReviewService.getAllCollaborator(+id);

    }

}
