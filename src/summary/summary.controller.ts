import { Controller, Get } from '@nestjs/common';
import { SummaryService } from './summary.service';

@Controller('summary')
export class SummaryController {
  constructor(private readonly summeryService: SummaryService) {}

  @Get()
  getSummery() {
    return this.summeryService.calculateSummary();
  }
}
