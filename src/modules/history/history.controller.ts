import { Controller, Get, Param } from '@nestjs/common';
import { HistoryService } from './history.service';

@Controller('history')
export class HistoryController {

    constructor(private readonly historyService: HistoryService) {}
    
    @Get(':id')
    async getCycle(@Param('id') id: number) {

        const assessment = await this.historyService.getHistory(+id);

        return assessment;

    }

}
