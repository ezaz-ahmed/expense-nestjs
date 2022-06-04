import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  HttpCode,
} from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { data, ReportType } from './data';

@Controller('report/:type')
export class AppController {
  @Get('')
  getAllReports(@Param('type') type: ReportType) {
    return data.report.filter((report) => report.type === type);
  }

  @Get(':id')
  getOneReport(@Param('type') type: ReportType, @Param('id') id: string) {
    return data.report
      .filter((report) => report.type === type)
      .find((report) => report.id === id);
  }

  @Post('')
  createReport(
    @Param('type') type: ReportType,
    @Body() { amount, source }: { amount: number; source: string },
  ) {
    const newReport = {
      id: uuid(),
      source,
      amount,
      created_at: new Date(),
      updated_at: new Date(),
      type,
    };

    data.report.push(newReport);
    return newReport;
  }

  @Put(':id')
  updateOneReport(
    @Param('type') type: ReportType,
    @Param('id') id: string,
    @Body() body: { amount: number; source: string },
  ) {
    const reportToUpdate = data.report
      .filter((report) => report.type === type)
      .find((report) => report.id === id);

    if (!reportToUpdate) return;

    const reportIndex = data.report.findIndex(
      (report) => report.id === reportToUpdate.id,
    );

    data.report[reportIndex] = {
      ...data.report[reportIndex],
      ...body,
    };

    return data.report[reportIndex];
  }

  @HttpCode(204)
  @Delete(':id')
  deleteOneReport(@Param('type') type: ReportType, @Param('id') id: string) {
    const reportIndex = data.report.findIndex((report) => report.id === id);

    if (reportIndex === -1) return;

    data.report.splice(reportIndex, 1);

    return;
  }
}
