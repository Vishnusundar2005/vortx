import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateSettingDto } from './dto/update-setting.dto';

@Injectable()
export class SettingsService {
  constructor(private readonly prisma: PrismaService) {}

  async getSettings() {
    let settings = await this.prisma.businessSetting.findFirst();
    if (!settings) {
      // Create default settings if not exists
      settings = await this.prisma.businessSetting.create({
        data: {
          studioName: 'VORTX Studio',
          ownerName: 'Admin',
          phone: '+1234567890',
          whatsappNumber: '+1234567890',
          email: 'hello@vortx.com',
          address: '123 Studio Street, City',
          openingTime: '00:00',
          closingTime: '24:00',
          hourlyPrice: 100,
        },
      });
    }
    return settings;
  }

  async updateSettings(updateSettingDto: UpdateSettingDto) {
    const settings = await this.getSettings();
    return this.prisma.businessSetting.update({
      where: { id: settings.id },
      data: updateSettingDto,
    });
  }
}
