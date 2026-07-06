import api from '../lib/axios';

export interface ReportFilters {
  startDate?: string;
  endDate?: string;
  status?: string;
  purpose?: string;
}

export const reportsService = {
  async getDashboardSummary() {
    const { data } = await api.get('/reports/dashboard-summary');
    return data.result;
  },

  async getStatistics() {
    const { data } = await api.get('/reports/statistics');
    return data.result;
  },

  async getReportsList(filters: ReportFilters) {
    const { data } = await api.get('/reports/list', {
      params: filters,
    });
    return data.result;
  },

  async exportReport(format: 'csv' | 'xlsx' | 'pdf', filters: ReportFilters) {
    const response = await api.get('/reports/export', {
      params: { format, ...filters },
      responseType: 'blob',
    });

    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;

    const dateStr = new Date().toISOString().split('T')[0];
    link.setAttribute('download', `vortx_report_${dateStr}.${format}`);
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
};
