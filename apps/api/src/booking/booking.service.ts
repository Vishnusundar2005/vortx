import {
  Injectable,
  ConflictException,
  UnprocessableEntityException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { UpdateBookingStatusDto } from './dto/update-booking-status.dto';
import { BookingQueryDto } from './dto/booking-query.dto';
import { Prisma, BookingStatus } from '@prisma/client';

@Injectable()
export class BookingService {
  constructor(private readonly prisma: PrismaService) {}

  private calculateEndTime(startTime: string, durationHours: number): string {
    const [hours, minutes] = startTime.split(':').map(Number);
    const endHours = hours + durationHours;
    if (endHours >= 24) {
      throw new UnprocessableEntityException(
        'Booking duration exceeds the day limit.',
      );
    }
    return `${endHours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  }

  private async generateBookingId(): Promise<string> {
    const count = await this.prisma.booking.count();
    return `VTX-${(count + 1).toString().padStart(6, '0')}`;
  }

  private async checkOverlap(
    date: Date,
    startTime: string,
    endTime: string,
    excludeBookingId?: string,
  ) {
    const overlapCondition: Prisma.BookingWhereInput = {
      bookingDate: date,
      status: {
        in: [BookingStatus.PENDING, BookingStatus.CONFIRMED],
      },
      AND: [{ startTime: { lt: endTime } }, { endTime: { gt: startTime } }],
    };

    if (excludeBookingId) {
      overlapCondition.id = { not: excludeBookingId };
    }

    const overlappingBooking = await this.prisma.booking.findFirst({
      where: overlapCondition,
    });

    if (overlappingBooking) {
      throw new ConflictException(
        'The selected time slot overlaps with an existing booking.',
      );
    }

    // Checking blocked slots
    const blockedSlot = await this.prisma.blockedSlot.findFirst({
      where: {
        date: date,
        AND: [{ startTime: { lt: endTime } }, { endTime: { gt: startTime } }],
      },
    });

    if (blockedSlot) {
      throw new ConflictException(
        'The selected time slot is blocked and cannot be booked.',
      );
    }
  }

  async create(createBookingDto: CreateBookingDto) {
    const bookingDate = new Date(createBookingDto.bookingDate);

    // Check past dates
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (bookingDate < today) {
      throw new UnprocessableEntityException('Cannot book past dates.');
    }

    const endTime = this.calculateEndTime(
      createBookingDto.startTime,
      createBookingDto.durationHours,
    );

    await this.checkOverlap(bookingDate, createBookingDto.startTime, endTime);

    const bookingId = await this.generateBookingId();

    return this.prisma.booking.create({
      data: {
        ...createBookingDto,
        bookingDate,
        endTime,
        bookingId,
        status: BookingStatus.PENDING,
      },
    });
  }

  async findAll(query: BookingQueryDto) {
    const {
      status,
      date,
      customerName,
      phone,
      purpose,
      upcoming,
      today,
      page = 1,
      limit = 10,
    } = query;

    const where: Prisma.BookingWhereInput = {};

    if (status) where.status = status;
    if (customerName)
      where.customerName = { contains: customerName, mode: 'insensitive' };
    if (phone) where.phone = { contains: phone };
    if (purpose) where.purpose = purpose;

    const todayDate = new Date();
    todayDate.setHours(0, 0, 0, 0);

    if (date) {
      where.bookingDate = new Date(date);
    } else if (today === 'true') {
      where.bookingDate = todayDate;
    } else if (upcoming === 'true') {
      where.bookingDate = { gte: todayDate };
    }

    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
      this.prisma.booking.findMany({
        where,
        skip,
        take: limit,
        orderBy: { bookingDate: 'asc' },
      }),
      this.prisma.booking.count({ where }),
    ]);

    return {
      data,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findOne(id: string) {
    const booking = await this.prisma.booking.findUnique({
      where: { id },
    });

    if (!booking) throw new NotFoundException('Booking not found');
    return booking;
  }

  async update(id: string, updateBookingDto: UpdateBookingDto) {
    const existingBooking = await this.findOne(id);

    const newDate = updateBookingDto.bookingDate
      ? new Date(updateBookingDto.bookingDate)
      : existingBooking.bookingDate;
    const newStartTime =
      updateBookingDto.startTime ?? existingBooking.startTime;
    const newDurationHours =
      updateBookingDto.durationHours ?? existingBooking.durationHours;

    let newEndTime = existingBooking.endTime;

    if (updateBookingDto.startTime || updateBookingDto.durationHours) {
      newEndTime = this.calculateEndTime(newStartTime, newDurationHours);
    }

    if (
      updateBookingDto.bookingDate ||
      updateBookingDto.startTime ||
      updateBookingDto.durationHours
    ) {
      await this.checkOverlap(newDate, newStartTime, newEndTime, id);
    }

    return this.prisma.booking.update({
      where: { id },
      data: {
        ...updateBookingDto,
        ...(updateBookingDto.bookingDate && { bookingDate: newDate }),
        endTime: newEndTime,
      },
    });
  }

  async updateStatus(
    id: string,
    updateBookingStatusDto: UpdateBookingStatusDto,
  ) {
    await this.findOne(id);
    return this.prisma.booking.update({
      where: { id },
      data: { status: updateBookingStatusDto.status },
    });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.booking.delete({
      where: { id },
    });
  }
}
