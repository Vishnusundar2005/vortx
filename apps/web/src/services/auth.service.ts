import api from '../lib/axios';

export const authService = {
  login: async (credentials: Record<string, string>) => {
    const response = await api.post('/auth/login', credentials);
    if (response.data?.result?.accessToken) {
      localStorage.setItem('accessToken', response.data.result.accessToken);
      localStorage.setItem('adminData', JSON.stringify(response.data.result.admin));
    }
    return response.data;
  },

  logout: async () => {
    try {
      await api.post('/auth/logout');
    } catch (error) {
      console.error('Logout error', error);
    } finally {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('adminData');
      window.location.href = '/admin/login';
    }
  },

  getProfile: async () => {
    const response = await api.get('/auth/profile');
    return response.data;
  },

  isAuthenticated: () => {
    if (typeof window === 'undefined') return false;
    return !!localStorage.getItem('accessToken');
  },
};
