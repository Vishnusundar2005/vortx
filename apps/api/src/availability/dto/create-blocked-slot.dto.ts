import {
  IsString,
  IsOptional,
  IsBoolean,
  Matches,
  IsDateString,
} from 'class-validator';

export class CreateBlockedSlotDto {
  @IsDateString()
  date: string;

  @IsString()
  @Matches(/^([01]\d|2[0-3]):?([0-5]\d)$/, {
    message: 'startTime must be in HH:mm format',
  })
  startTime: string;

  @IsString()
  @Matches(/^([01]\d|2[0-3]):?([0-5]\d)$/, {
    message: 'endTime must be in HH:mm format',
  })
  endTime: string;

  @IsString()
  @IsOptional()
  reason?: string;

  @IsBoolean()
  @IsOptional()
  isFullDay?: boolean;
}
