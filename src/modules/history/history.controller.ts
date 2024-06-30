import { Controller, Get, Param } from '@nestjs/common';
import { HistoryService } from './history.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags("History")
@Controller('api/history')
export class HistoryController {

    constructor(private readonly historyService: HistoryService) {}
    
    @Get(':id')
    async getCycle(@Param('id') id: number) {

        const assessment = await this.historyService.getHistory(+id);

        return assessment;

    }

}
