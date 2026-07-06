import {
  IsString,
  IsOptional,
  IsNumber,
  Min,
  Max,
  IsEmail,
} from 'class-validator';

export class UpdateSettingDto {
  @IsString()
  @IsOptional()
  studioName?: string;

  @IsString()
  @IsOptional()
  ownerName?: string;

  @IsString()
  @IsOptional()
  phone?: string;

  @IsString()
  @IsOptional()
  whatsappNumber?: string;

  @IsEmail()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  address?: string;

  @IsString()
  @IsOptional()
  googleMapsUrl?: string;

  @IsString()
  @IsOptional()
  instagram?: string;

  @IsString()
  @IsOptional()
  youtube?: string;

  @IsString()
  @IsOptional()
  facebook?: string;

  @IsString()
  @IsOptional()
  openingTime?: string;

  @IsString()
  @IsOptional()
  closingTime?: string;

  @IsNumber()
  @IsOptional()
  @Min(0)
  hourlyPrice?: number;

  @IsNumber()
  @IsOptional()
  @Min(1)
  minBookingHours?: number;

  @IsNumber()
  @IsOptional()
  @Max(24)
  maxBookingHours?: number;
}
