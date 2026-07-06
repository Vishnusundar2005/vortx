import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { BookingStatus } from '@prisma/client';

@Injectable()
export class DashboardService {
  constructor(private readonly prisma: PrismaService) {}

  async getStats() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    const [
      todayBookings,
      pendingRequests,
      confirmedBookings,
      completedBookings,
      cancelledBookings,
      recentRequests,
      upcomingSchedule,
    ] = await Promise.all([
      // today's bookings (any status)
      this.prisma.booking.count({
        where: { bookingDate: today },
      }),
      // total pending
      this.prisma.booking.count({
        where: { status: BookingStatus.PENDING },
      }),
      // total confirmed
      this.prisma.booking.count({
        where: { status: BookingStatus.CONFIRMED },
      }),
      // total completed
      this.prisma.booking.count({
        where: { status: BookingStatus.COMPLETED },
      }),
      // total cancelled/rejected
      this.prisma.booking.count({
        where: {
          status: { in: [BookingStatus.CANCELLED, BookingStatus.REJECTED] },
        },
      }),
      // recent pending
      this.prisma.booking.findMany({
        where: { status: BookingStatus.PENDING },
        orderBy: { createdAt: 'desc' },
        take: 5,
      }),
      // upcoming confirmed
      this.prisma.booking.findMany({
        where: {
          status: BookingStatus.CONFIRMED,
          bookingDate: { gte: today },
        },
        orderBy: [{ bookingDate: 'asc' }, { startTime: 'asc' }],
        take: 5,
      }),
    ]);

    // calculate today's occupied hours
    const todaysConfirmed = await this.prisma.booking.findMany({
      where: {
        bookingDate: today,
        status: { in: [BookingStatus.PENDING, BookingStatus.CONFIRMED] },
      },
      select: { durationHours: true },
    });

    const todayOccupiedHours = todaysConfirmed.reduce(
      (sum, b) => sum + b.durationHours,
      0,
    );
    const availableHours = Math.max(0, 24 - todayOccupiedHours);

    return {
      todayBookings,
      upcomingBookings: upcomingSchedule.length, // approximation or just use length of total
      pendingRequests,
      confirmedBookings,
      completedBookings,
      cancelledBookings,
      todayOccupiedHours,
      availableHours,
      recentRequests,
      upcomingSchedule,
    };
  }
}
