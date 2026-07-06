import api from '../lib/axios';

export interface GetAvailabilityParams {
  date: string;
  duration: number;
}

export interface AvailableSlot {
  startTime: string;
  endTime: string;
}

export interface CreateBookingData {
  customerName: string;
  phone: string;
  email: string;
  company?: string;
  purpose: string;
  bookingDate: string;
  startTime: string;
  durationHours: number;
  peopleCount: number;
  notes?: string;
}

export const bookingService = {
  getAvailability: async (params: GetAvailabilityParams): Promise<AvailableSlot[]> => {
    const response = await api.get('/availability', { params });
    return response.data?.result || [];
  },

  createBooking: async (data: CreateBookingData) => {
    const response = await api.post('/bookings', data);
    return response.data?.result;
  },

  // Admin APIs
  getAllBookings: async (params?: unknown) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const response = await api.get('/bookings', { params: params as any });
    return response.data?.result;
  },

  getBookingById: async (id: string) => {
    const response = await api.get(`/bookings/${id}`);
    return response.data?.result;
  },

  updateBookingStatus: async (id: string, status: string) => {
    const response = await api.patch(`/bookings/${id}/status`, { status });
    return response.data?.result;
  }
};
