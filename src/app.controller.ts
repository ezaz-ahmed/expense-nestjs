import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  HttpCode,
  ParseUUIDPipe,
  ParseEnumPipe,
} from '@nestjs/common';
import { AppService } from './app.service';
import { ReportType } from './data';

@Controller('report/:type')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('')
  getAllReports(
    @Param('type', new ParseEnumPipe(ReportType)) type: ReportType,
  ) {
    return this.appService.getAllReports(type);
  }

  @Get(':id')
  getOneReport(
    @Param('type', new ParseEnumPipe(ReportType)) type: ReportType,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    return this.appService.getOneReport(type, id);
  }

  @Post('')
  createReport(
    @Param('type', new ParseEnumPipe(ReportType)) type: ReportType,
    @Body() { amount, source }: { amount: number; source: string },
  ) {
    this.appService.createReport(type, { amount, source });
  }

  @Put(':id')
  updateOneReport(
    @Param('type', new ParseEnumPipe(ReportType)) type: ReportType,
    @Param('id', ParseUUIDPipe) id: string,
    @Body() body: { amount: number; source: string },
  ) {
    this.appService.updateOneReport(type, id, body);
  }

  @HttpCode(204)
  @Delete(':id')
  deleteOneReport(
    @Param('type', new ParseEnumPipe(ReportType)) type: ReportType,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    this.appService.deleteOneReport(type, id);
  }
}
