import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { BookingService } from './booking.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { UpdateBookingStatusDto } from './dto/update-booking-status.dto';
import { BookingQueryDto } from './dto/booking-query.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('bookings')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @Post()
  async create(@Body() createBookingDto: CreateBookingDto) {
    const result = await this.bookingService.create(createBookingDto);
    return {
      message: 'Booking created successfully',
      result,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(@Query() query: BookingQueryDto) {
    const result = await this.bookingService.findAll(query);
    return {
      message: 'Bookings retrieved successfully',
      result,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const result = await this.bookingService.findOne(id);
    return {
      message: 'Booking retrieved successfully',
      result,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateBookingDto: UpdateBookingDto,
  ) {
    const result = await this.bookingService.update(id, updateBookingDto);
    return {
      message: 'Booking updated successfully',
      result,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id/status')
  async updateStatus(
    @Param('id') id: string,
    @Body() updateBookingStatusDto: UpdateBookingStatusDto,
  ) {
    const result = await this.bookingService.updateStatus(
      id,
      updateBookingStatusDto,
    );
    return {
      message: 'Booking status updated successfully',
      result,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    const result = await this.bookingService.remove(id);
    return {
      message: 'Booking deleted successfully',
      result,
    };
  }
}
