import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { BookingStatus, BookingPurpose, Prisma } from '@prisma/client';
import { startOfDay, startOfWeek, startOfMonth, endOfDay } from 'date-fns';
import { Parser } from 'json2csv';
import ExcelJS from 'exceljs';
import PDFDocument from 'pdfkit';

export interface ReportFilters {
  startDate?: string;
  endDate?: string;
  status?: BookingStatus;
  purpose?: BookingPurpose;
}

@Injectable()
export class ReportsService {
  constructor(private readonly prisma: PrismaService) {}

  private async getHourlyPrice() {
    const setting = await this.prisma.businessSetting.findFirst();
    return setting?.hourlyPrice || 1500;
  }

  async getDashboardSummary() {
    const today = startOfDay(new Date());
    const weekStart = startOfWeek(new Date());
    const monthStart = startOfMonth(new Date());
    const hourlyPrice = await this.getHourlyPrice();

    const [
      todayCount,
      weekCount,
      monthCount,
      pendingCount,
      confirmedCount,
      completedCount,
      cancelledCount,
      rejectedCount,
      completedBookings,
    ] = await Promise.all([
      this.prisma.booking.count({
        where: { bookingDate: { gte: today, lte: endOfDay(new Date()) } },
      }),
      this.prisma.booking.count({ where: { bookingDate: { gte: weekStart } } }),
      this.prisma.booking.count({
        where: { bookingDate: { gte: monthStart } },
      }),
      this.prisma.booking.count({ where: { status: BookingStatus.PENDING } }),
      this.prisma.booking.count({ where: { status: BookingStatus.CONFIRMED } }),
      this.prisma.booking.count({ where: { status: BookingStatus.COMPLETED } }),
      this.prisma.booking.count({ where: { status: BookingStatus.CANCELLED } }),
      this.prisma.booking.count({ where: { status: BookingStatus.REJECTED } }),
      this.prisma.booking.findMany({
        where: {
          status: { in: [BookingStatus.COMPLETED, BookingStatus.CONFIRMED] },
        },
        select: { durationHours: true },
      }),
    ]);

    const totalHours = completedBookings.reduce(
      (sum, b) => sum + b.durationHours,
      0,
    );
    const estimatedRevenue = totalHours * hourlyPrice;

    return {
      todayCount,
      weekCount,
      monthCount,
      pendingCount,
      confirmedCount,
      completedCount,
      cancelledCount,
      rejectedCount,
      totalHours,
      estimatedRevenue,
    };
  }

  async getStatistics() {
    const bookings = await this.prisma.booking.findMany({
      select: {
        bookingDate: true,
        status: true,
        purpose: true,
        durationHours: true,
      },
    });

    const hourlyPrice = await this.getHourlyPrice();

    // Group by status
    const statusDist = bookings.reduce(
      (acc, curr) => {
        acc[curr.status] = (acc[curr.status] || 0) + 1;
        return acc;
      },
      {} as Record<string, number>,
    );

    // Group by purpose
    const purposeDist = bookings.reduce(
      (acc, curr) => {
        acc[curr.purpose] = (acc[curr.purpose] || 0) + 1;
        return acc;
      },
      {} as Record<string, number>,
    );

    // Group by month for revenue
    const revenueByMonth = bookings
      .filter((b) =>
        (
          [BookingStatus.COMPLETED, BookingStatus.CONFIRMED] as BookingStatus[]
        ).includes(b.status),
      )
      .reduce(
        (acc, curr) => {
          const month = curr.bookingDate.toISOString().slice(0, 7); // YYYY-MM
          acc[month] = (acc[month] || 0) + curr.durationHours * hourlyPrice;
          return acc;
        },
        {} as Record<string, number>,
      );

    return {
      statusDistribution: Object.entries(statusDist).map(([name, value]) => ({
        name,
        value,
      })),
      purposeDistribution: Object.entries(purposeDist).map(([name, value]) => ({
        name,
        value,
      })),
      revenueTrend: Object.entries(revenueByMonth)
        .map(([name, revenue]) => ({ name, revenue }))
        .sort((a, b) => a.name.localeCompare(b.name)),
    };
  }

  async getReportsList(filters: ReportFilters) {
    const where: Prisma.BookingWhereInput = {};
    if (filters.startDate && filters.endDate) {
      where.bookingDate = {
        gte: new Date(filters.startDate),
        lte: new Date(filters.endDate),
      };
    }
    if (filters.status) where.status = filters.status;
    if (filters.purpose) where.purpose = filters.purpose;

    const bookings = await this.prisma.booking.findMany({
      where,
      orderBy: { bookingDate: 'desc' },
    });

    const hourlyPrice = await this.getHourlyPrice();

    return bookings.map((b) => ({
      ...b,
      estimatedPrice: b.durationHours * hourlyPrice,
    }));
  }

  async exportCsv(filters: ReportFilters) {
    const data = await this.getReportsList(filters);
    const parser = new Parser({
      fields: [
        'bookingId',
        'customerName',
        'email',
        'phone',
        'purpose',
        'bookingDate',
        'startTime',
        'endTime',
        'durationHours',
        'status',
        'estimatedPrice',
      ],
    });
    return parser.parse(data);
  }

  async exportExcel(filters: ReportFilters) {
    const data = await this.getReportsList(filters);
    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet('Bookings');

    sheet.columns = [
      { header: 'Booking ID', key: 'bookingId', width: 20 },
      { header: 'Customer', key: 'customerName', width: 25 },
      { header: 'Email', key: 'email', width: 25 },
      { header: 'Phone', key: 'phone', width: 15 },
      { header: 'Purpose', key: 'purpose', width: 20 },
      { header: 'Date', key: 'bookingDate', width: 15 },
      { header: 'Time', key: 'time', width: 15 },
      { header: 'Status', key: 'status', width: 15 },
      { header: 'Est. Price', key: 'estimatedPrice', width: 15 },
    ];

    data.forEach((b) => {
      sheet.addRow({
        ...b,
        bookingDate: b.bookingDate.toISOString().split('T')[0],
        time: `${b.startTime} - ${b.endTime}`,
      });
    });

    return workbook.xlsx.writeBuffer();
  }

  async exportPdf(filters: ReportFilters) {
    const data = await this.getReportsList(filters);

    return new Promise<Buffer>((resolve) => {
      const doc = new PDFDocument({ margin: 30, size: 'A4' });
      const buffers: Buffer[] = [];

      doc.on('data', buffers.push.bind(buffers));
      doc.on('end', () => resolve(Buffer.concat(buffers)));

      doc
        .fontSize(20)
        .text('VORTX Studios - Booking Report', { align: 'center' });
      doc.moveDown();

      data.forEach((b, i) => {
        doc
          .fontSize(10)
          .text(
            `${i + 1}. ${b.bookingId} - ${b.customerName} - ${b.bookingDate.toISOString().split('T')[0]} - ${b.status}`,
          );
      });

      doc.end();
    });
  }
}
