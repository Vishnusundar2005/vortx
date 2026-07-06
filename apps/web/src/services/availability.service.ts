import api from '../lib/axios';

export const availabilityService = {
  getBlockedSlots: async () => {
    const response = await api.get('/availability/blocked');
    return response.data?.result;
  },

  createBlockedSlot: async (data: { date: string, startTime?: string, endTime?: string, isFullDay?: boolean, reason?: string }) => {
    const response = await api.post('/availability/block', data);
    return response.data?.result;
  },

  removeBlockedSlot: async (id: string) => {
    const response = await api.delete(`/availability/block/${id}`);
    return response.data?.result;
  }
};
