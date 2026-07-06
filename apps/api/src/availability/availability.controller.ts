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
import { AvailabilityService } from './availability.service';
import { GetAvailabilityDto } from './dto/get-availability.dto';
import { CreateBlockedSlotDto } from './dto/create-blocked-slot.dto';
import { UpdateBlockedSlotDto } from './dto/update-blocked-slot.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('availability')
export class AvailabilityController {
  constructor(private readonly availabilityService: AvailabilityService) {}

  @Get()
  async getAvailableSlots(@Query() query: GetAvailabilityDto) {
    const result = await this.availabilityService.getAvailableSlots(query);
    return {
      message: 'Available slots retrieved successfully',
      result,
    };
  }

  @Get('calendar')
  async getCalendarAvailability() {
    const result = await this.availabilityService.getCalendarAvailability();
    return {
      message: 'Calendar availability retrieved successfully',
      result,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Get('blocked')
  async getBlockedSlots() {
    const result = await this.availabilityService.getBlockedSlots();
    return {
      message: 'Blocked slots retrieved successfully',
      result,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Post('block')
  async createBlockedSlot(@Body() createBlockedSlotDto: CreateBlockedSlotDto) {
    const result =
      await this.availabilityService.createBlockedSlot(createBlockedSlotDto);
    return {
      message: 'Blocked slot created successfully',
      result,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Patch('block/:id')
  async updateBlockedSlot(
    @Param('id') id: string,
    @Body() updateBlockedSlotDto: UpdateBlockedSlotDto,
  ) {
    const result = await this.availabilityService.updateBlockedSlot(
      id,
      updateBlockedSlotDto,
    );
    return {
      message: 'Blocked slot updated successfully',
      result,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Delete('block/:id')
  async removeBlockedSlot(@Param('id') id: string) {
    const result = await this.availabilityService.removeBlockedSlot(id);
    return {
      message: 'Blocked slot removed successfully',
      result,
    };
  }
}
