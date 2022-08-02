import {
  Controller,
  Get,
  Param,
  Body,
  Post,
  Put,
  Delete,
  ParseEnumPipe,
  ParseUUIDPipe,
  HttpCode,
} from '@nestjs/common';
import { ReportType } from 'src/data';
import {
  CreateReportDto,
  ReportResponseDto,
  UpdateReportDto,
} from 'src/dtos/report.dto';
import { ReportService } from './report.service';

@Controller('report/:type')
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  @Get('')
  getAllReports(
    @Param('type', new ParseEnumPipe(ReportType)) type: ReportType,
  ): ReportResponseDto[] {
    return this.reportService.getAllReports(type);
  }

  @Get(':id')
  getOneReport(
    @Param('type', new ParseEnumPipe(ReportType)) type: ReportType,
    @Param('id', ParseUUIDPipe) id: string,
  ): ReportResponseDto {
    return this.reportService.getOneReport(type, id);
  }

  @Post('')
  createReport(
    @Param('type', new ParseEnumPipe(ReportType)) type: ReportType,
    @Body() { amount, source }: CreateReportDto,
  ): ReportResponseDto {
    return this.reportService.createReport(type, { amount, source });
  }

  @Put(':id')
  updateOneReport(
    @Param('type', new ParseEnumPipe(ReportType)) type: ReportType,
    @Param('id', ParseUUIDPipe) id: string,
    @Body() body: UpdateReportDto,
  ): ReportResponseDto {
    return this.reportService.updateOneReport(type, id, body);
  }

  @HttpCode(204)
  @Delete(':id')
  deleteOneReport(@Param('id', ParseUUIDPipe) id: string) {
    return this.reportService.deleteOneReport(id);
  }
}
