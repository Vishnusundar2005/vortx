import { IsInt, Min, Max, IsDateString } from 'class-validator';
import { Type } from 'class-transformer';

export class GetAvailabilityDto {
  @IsDateString()
  date: string;

  @Type(() => Number)
  @IsInt()
  @Min(2, { message: 'Minimum booking duration is 2 hours' })
  @Max(12, { message: 'Maximum booking duration is 12 hours' })
  duration: number;
}
