import { Controller, Get, Query, Res, UseGuards } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import type { Response } from 'express';

import { BookingStatus, BookingPurpose } from '@prisma/client';

@Controller('reports')
@UseGuards(JwtAuthGuard)
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Get('dashboard-summary')
  async getDashboardSummary() {
    return await this.reportsService.getDashboardSummary();
  }

  @Get('statistics')
  async getStatistics() {
    return await this.reportsService.getStatistics();
  }

  @Get('list')
  async getReportsList(
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
    @Query('status') status?: BookingStatus,
    @Query('purpose') purpose?: BookingPurpose,
  ) {
    return await this.reportsService.getReportsList({
      startDate,
      endDate,
      status,
      purpose,
    });
  }

  @Get('export')
  async exportReport(
    @Res() res: Response,
    @Query('format') format: string,
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
    @Query('status') status?: BookingStatus,
    @Query('purpose') purpose?: BookingPurpose,
  ) {
    const filters = { startDate, endDate, status, purpose };
    const dateStr = new Date().toISOString().split('T')[0];

    if (format === 'csv') {
      const csv = await this.reportsService.exportCsv(filters);
      res.setHeader('Content-Type', 'text/csv');
      res.setHeader(
        'Content-Disposition',
        `attachment; filename=vortx_report_${dateStr}.csv`,
      );
      return res.send(csv);
    }

    if (format === 'xlsx') {
      const buffer = await this.reportsService.exportExcel(filters);
      res.setHeader(
        'Content-Type',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      );
      res.setHeader(
        'Content-Disposition',
        `attachment; filename=vortx_report_${dateStr}.xlsx`,
      );
      return res.send(buffer);
    }

    if (format === 'pdf') {
      const buffer = await this.reportsService.exportPdf(filters);
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader(
        'Content-Disposition',
        `attachment; filename=vortx_report_${dateStr}.pdf`,
      );
      return res.send(buffer);
    }

    return res
      .status(400)
      .json({ message: 'Invalid format. Use csv, xlsx, or pdf.' });
  }
}
