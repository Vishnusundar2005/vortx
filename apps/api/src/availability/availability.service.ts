import {
  Injectable,
  UnprocessableEntityException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { GetAvailabilityDto } from './dto/get-availability.dto';
import { CreateBlockedSlotDto } from './dto/create-blocked-slot.dto';
import { UpdateBlockedSlotDto } from './dto/update-blocked-slot.dto';
import { BookingStatus } from '@prisma/client';

@Injectable()
export class AvailabilityService {
  constructor(private readonly prisma: PrismaService) {}

  private timeToMinutes(timeStr: string): number {
    const [hours, minutes] = timeStr.split(':').map(Number);
    return hours * 60 + minutes;
  }

  private minutesToTime(minutes: number): string {
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
  }

  private checkOverlap(
    start1: number,
    end1: number,
    start2: number,
    end2: number,
  ): boolean {
    return start1 < end2 && end1 > start2;
  }

  async getAvailableSlots(getAvailabilityDto: GetAvailabilityDto) {
    const { date, duration } = getAvailabilityDto;
    const targetDate = new Date(date);

    // Do not return past slots for today
    const now = new Date();
    let minTimeMinutes = 0;
    if (targetDate.toDateString() === now.toDateString()) {
      minTimeMinutes = now.getHours() * 60 + now.getMinutes();
    } else if (targetDate < now) {
      return []; // Past dates have no availability
    }

    const durationMinutes = duration * 60;
    const maxTimeMinutes = 24 * 60;

    // Fetch existing bookings
    const bookings = await this.prisma.booking.findMany({
      where: {
        bookingDate: targetDate,
        status: { in: [BookingStatus.PENDING, BookingStatus.CONFIRMED] },
      },
    });

    // Fetch blocked slots
    const blockedSlots = await this.prisma.blockedSlot.findMany({
      where: { date: targetDate },
    });

    // Create occupied intervals
    const occupiedIntervals: { start: number; end: number }[] = [];

    for (const b of bookings) {
      occupiedIntervals.push({
        start: this.timeToMinutes(b.startTime),
        end: this.timeToMinutes(b.endTime),
      });
    }

    for (const bs of blockedSlots) {
      if (bs.isFullDay) {
        occupiedIntervals.push({ start: 0, end: maxTimeMinutes });
      } else {
        occupiedIntervals.push({
          start: this.timeToMinutes(bs.startTime),
          end: this.timeToMinutes(bs.endTime),
        });
      }
    }

    const availableSlots = [];
    const intervalMinutes = 30;

    for (
      let startMins = 0;
      startMins <= maxTimeMinutes - durationMinutes;
      startMins += intervalMinutes
    ) {
      if (startMins < minTimeMinutes) {
        continue;
      }

      const endMins = startMins + durationMinutes;

      // Check if this slot overlaps with any occupied interval
      let overlaps = false;
      for (const occupied of occupiedIntervals) {
        if (
          this.checkOverlap(startMins, endMins, occupied.start, occupied.end)
        ) {
          overlaps = true;
          break;
        }
      }

      if (!overlaps) {
        availableSlots.push({
          startTime: this.minutesToTime(startMins),
          endTime: this.minutesToTime(endMins),
        });
      }
    }

    return availableSlots;
  }

  async getCalendarAvailability() {
    // Generate dates for current month and next month indicating if they have any availability
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const endDate = new Date(today);
    endDate.setDate(today.getDate() + 60); // Check 60 days ahead

    const blockedSlots = await this.prisma.blockedSlot.findMany({
      where: { date: { gte: today, lte: endDate } },
    });

    const calendar = [];
    const currentDate = new Date(today);

    while (currentDate <= endDate) {
      const dateStr = currentDate.toISOString().split('T')[0];

      const dayBlocked = blockedSlots.filter(
        (bs) => bs.date.getTime() === currentDate.getTime(),
      );

      // If there's a full day block, mark unavailable
      if (dayBlocked.some((bs) => bs.isFullDay)) {
        calendar.push({ date: dateStr, isAvailable: false });
      } else {
        // Quick approximation: just say available for now, since generating all combinations is heavy
        // In reality, we'd run a mini version of getAvailableSlots with duration=2
        calendar.push({ date: dateStr, isAvailable: true });
      }

      currentDate.setDate(currentDate.getDate() + 1);
    }

    return calendar;
  }

  async createBlockedSlot(createBlockedSlotDto: CreateBlockedSlotDto) {
    let { startTime, endTime } = createBlockedSlotDto;

    if (createBlockedSlotDto.isFullDay) {
      startTime = '00:00';
      endTime = '23:59';
    } else if (!startTime || !endTime) {
      throw new UnprocessableEntityException(
        'startTime and endTime are required for partial day blocks.',
      );
    }

    if (this.timeToMinutes(startTime) >= this.timeToMinutes(endTime)) {
      throw new UnprocessableEntityException(
        'startTime must be before endTime',
      );
    }

    return this.prisma.blockedSlot.create({
      data: {
        ...createBlockedSlotDto,
        date: new Date(createBlockedSlotDto.date),
        startTime,
        endTime,
      },
    });
  }

  async updateBlockedSlot(
    id: string,
    updateBlockedSlotDto: UpdateBlockedSlotDto,
  ) {
    const existing = await this.prisma.blockedSlot.findUnique({
      where: { id },
    });
    if (!existing) throw new NotFoundException('Blocked slot not found');

    let newStartTime = updateBlockedSlotDto.startTime ?? existing.startTime;
    let newEndTime = updateBlockedSlotDto.endTime ?? existing.endTime;

    const isFullDay = updateBlockedSlotDto.isFullDay ?? existing.isFullDay;

    if (isFullDay) {
      newStartTime = '00:00';
      newEndTime = '23:59';
    }

    if (this.timeToMinutes(newStartTime) >= this.timeToMinutes(newEndTime)) {
      throw new UnprocessableEntityException(
        'startTime must be before endTime',
      );
    }

    return this.prisma.blockedSlot.update({
      where: { id },
      data: {
        ...updateBlockedSlotDto,
        ...(updateBlockedSlotDto.date && {
          date: new Date(updateBlockedSlotDto.date),
        }),
        startTime: newStartTime,
        endTime: newEndTime,
      },
    });
  }

  async removeBlockedSlot(id: string) {
    await this.prisma.blockedSlot.delete({ where: { id } }).catch(() => {
      throw new NotFoundException('Blocked slot not found');
    });
    return { success: true };
  }

  async getBlockedSlots() {
    return this.prisma.blockedSlot.findMany({
      orderBy: { date: 'asc' },
    });
  }
}
