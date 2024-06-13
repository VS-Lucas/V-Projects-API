import { Module } from '@nestjs/common';
import { PeerReviewController } from './peer-review.controller';
import { PeerReviewService } from './peer-review.service';

@Module({
  controllers: [PeerReviewController],
  providers: [PeerReviewService]
})
export class PeerReviewModule {}
