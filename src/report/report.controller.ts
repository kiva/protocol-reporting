import { Get, Controller } from '@nestjs/common';
import { ReportService } from './report.service';

/**
 * TODO update to work with graphql
 */
@Controller('report')
export class ReportController {

    constructor(private readonly reportService: ReportService) {
    }

    @Get()
    public async getCount(): Promise<number> {
      return await this.reportService.test();
    }
}
