import { Controller, Get, Patch, Body, UseGuards } from '@nestjs/common';
import { SettingsService } from './settings.service';
import { UpdateSettingDto } from './dto/update-setting.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('settings')
export class SettingsController {
  constructor(private readonly settingsService: SettingsService) {}

  @Get()
  async getSettings() {
    const result = await this.settingsService.getSettings();
    return {
      message: 'Business settings retrieved successfully',
      result,
    };
  }

  @Patch()
  async updateSettings(@Body() updateSettingDto: UpdateSettingDto) {
    const result = await this.settingsService.updateSettings(updateSettingDto);
    return {
      message: 'Business settings updated successfully',
      result,
    };
  }
}
