'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { reportsService } from '@/services/reports.service';
import { Download, FileText, FileSpreadsheet } from 'lucide-react';
import { BookingStatusBadge } from '@/components/booking/BookingStatusBadge';

export default function ReportsPage() {
  const [filters, setFilters] = useState({
    startDate: '',
    endDate: '',
    status: '',
    purpose: '',
  });

  const { data: reports, isLoading } = useQuery({
    queryKey: ['reports-list', filters],
    queryFn: () => reportsService.getReportsList(filters),
    retry: false,
  });

  const displayReports = reports || [];

  const handleExport = (format: 'csv' | 'xlsx' | 'pdf') => {
    reportsService.exportReport(format, filters);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-white">Reports</h1>
          <p className="text-zinc-400 text-sm mt-1">Filter and export booking data</p>
        </div>
        <div className="flex space-x-3">
          <button 
            onClick={() => handleExport('csv')}
            className="flex items-center px-4 py-2 bg-zinc-900 border border-zinc-800 text-white rounded-lg hover:bg-zinc-800 transition text-sm font-medium"
          >
            <Download size={16} className="mr-2 text-zinc-400" />
            CSV
          </button>
          <button 
            onClick={() => handleExport('xlsx')}
            className="flex items-center px-4 py-2 bg-zinc-900 border border-zinc-800 text-white rounded-lg hover:bg-zinc-800 transition text-sm font-medium"
          >
            <FileSpreadsheet size={16} className="mr-2 text-emerald-500" />
            Excel
          </button>
          <button 
            onClick={() => handleExport('pdf')}
            className="flex items-center px-4 py-2 bg-zinc-900 border border-zinc-800 text-white rounded-lg hover:bg-zinc-800 transition text-sm font-medium"
          >
            <FileText size={16} className="mr-2 text-red-500" />
            PDF
          </button>
        </div>
      </div>

      <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-6">
        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div>
            <label className="block text-xs font-medium text-zinc-500 mb-1">Start Date</label>
            <input 
              type="date"
              value={filters.startDate}
              onChange={(e) => setFilters(f => ({...f, startDate: e.target.value}))}
              className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-white text-sm focus:border-blue-500 outline-none"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-zinc-500 mb-1">End Date</label>
            <input 
              type="date"
              value={filters.endDate}
              onChange={(e) => setFilters(f => ({...f, endDate: e.target.value}))}
              className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-white text-sm focus:border-blue-500 outline-none"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-zinc-500 mb-1">Status</label>
            <select 
              value={filters.status}
              onChange={(e) => setFilters(f => ({...f, status: e.target.value}))}
              className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-white text-sm focus:border-blue-500 outline-none"
            >
              <option value="">All Statuses</option>
              <option value="PENDING">Pending</option>
              <option value="CONFIRMED">Confirmed</option>
              <option value="COMPLETED">Completed</option>
              <option value="CANCELLED">Cancelled</option>
              <option value="REJECTED">Rejected</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-zinc-500 mb-1">Purpose</label>
            <select 
              value={filters.purpose}
              onChange={(e) => setFilters(f => ({...f, purpose: e.target.value}))}
              className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-white text-sm focus:border-blue-500 outline-none"
            >
              <option value="">All Purposes</option>
              <option value="PODCAST_RECORDING">Podcast Recording</option>
              <option value="PHOTOGRAPHY">Photography</option>
              <option value="VIDEO_PODCAST">Video Podcast</option>
              <option value="VIDEOGRAPHY">Videography</option>
              <option value="MUSIC_VIDEO">Music Video</option>
              <option value="COMMUNITY_EVENT">Community Event</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-zinc-900 text-zinc-400">
              <tr>
                <th className="px-4 py-3 font-medium rounded-tl-lg">Date</th>
                <th className="px-4 py-3 font-medium">Customer</th>
                <th className="px-4 py-3 font-medium">Purpose</th>
                <th className="px-4 py-3 font-medium">Duration</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium rounded-tr-lg">Est. Rev</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/50">
              {isLoading ? (
                <tr>
                  <td colSpan={6} className="px-4 py-8 text-center text-zinc-500 animate-pulse">Loading reports data...</td>
                </tr>
              ) : displayReports?.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-4 py-8 text-center text-zinc-500">No bookings match your filters.</td>
                </tr>
              ) : (
                displayReports?.map((bookingObj: unknown) => {
                  const booking = bookingObj as { id: string; bookingDate: string; customerName: string; purpose: string; durationHours: number; status: string; estimatedPrice: number };
                  return (
                  <tr key={booking.id} className="hover:bg-zinc-900/50 transition">
                    <td className="px-4 py-3 text-zinc-300">
                      {new Date(booking.bookingDate).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3 text-white font-medium">{booking.customerName}</td>
                    <td className="px-4 py-3 text-zinc-400">{booking.purpose.replace(/_/g, ' ')}</td>
                    <td className="px-4 py-3 text-zinc-400">{booking.durationHours} hrs</td>
                    <td className="px-4 py-3"><BookingStatusBadge status={booking.status} /></td>
                    <td className="px-4 py-3 text-emerald-400 font-medium">₹{booking.estimatedPrice.toLocaleString('en-IN')}</td>
                  </tr>
                )})
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
