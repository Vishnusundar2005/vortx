import api from '../lib/axios';

export interface BusinessSettingsData {
  id?: string;
  studioName: string;
  ownerName: string;
  phone: string;
  whatsappNumber: string;
  email: string;
  address: string;
  googleMapsUrl?: string;
  instagram?: string;
  youtube?: string;
  facebook?: string;
  openingTime: string;
  closingTime: string;
  hourlyPrice: number;
  minBookingHours: number;
  maxBookingHours: number;
}

export const settingsService = {
  getSettings: async (): Promise<BusinessSettingsData> => {
    const response = await api.get('/settings');
    return response.data?.result;
  },

  updateSettings: async (data: Partial<BusinessSettingsData>) => {
    const response = await api.patch('/settings', data);
    return response.data?.result;
  }
};
