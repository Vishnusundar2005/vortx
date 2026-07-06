import {
  IsString,
  IsEmail,
  IsNotEmpty,
  IsEnum,
  IsInt,
  Min,
  Max,
  IsOptional,
  Matches,
  IsDateString,
} from 'class-validator';
import { BookingPurpose } from '@prisma/client';

export class CreateBookingDto {
  @IsString()
  @IsNotEmpty()
  customerName: string;

  @IsString()
  @IsNotEmpty()
  phone: string;

  @IsEmail()
  email: string;

  @IsString()
  @IsOptional()
  company?: string;

  @IsEnum(BookingPurpose)
  purpose: BookingPurpose;

  @IsDateString()
  bookingDate: string;

  @IsString()
  @Matches(/^([01]\d|2[0-3]):?([0-5]\d)$/, {
    message: 'startTime must be in HH:mm format',
  })
  startTime: string;

  @IsInt()
  @Min(2, { message: 'Minimum booking duration is 2 hours' })
  @Max(12, { message: 'Maximum booking duration is 12 hours' })
  durationHours: number;

  @IsInt()
  @Min(1)
  peopleCount: number;

  @IsString()
  @IsOptional()
  notes?: string;
}
