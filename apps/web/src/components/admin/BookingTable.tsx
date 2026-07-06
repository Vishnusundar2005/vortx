'use client';

import { useQuery } from '@tanstack/react-query';
import { bookingService } from '@/services/booking.service';
import { BookingStatusBadge } from '@/components/booking/BookingStatusBadge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useState } from 'react';
import { Search } from 'lucide-react';
import Link from 'next/link';

export function BookingTable() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');

  const { data, isLoading } = useQuery({
    queryKey: ['admin-bookings', page, search],
    queryFn: () => bookingService.getAllBookings({ page, limit: 15, customerName: search || undefined }),
    retry: false,
  });

  const bookings = data?.data || [];
  const meta = data?.meta;

  return (
    <div className="bg-zinc-950 border border-zinc-800 rounded-xl overflow-hidden flex flex-col h-full">
      <div className="p-4 border-b border-zinc-800 flex justify-between items-center bg-zinc-900/50">
        <div className="relative w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
          <input 
            type="text" 
            placeholder="Search customer..." 
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className="w-full bg-zinc-900 border border-zinc-800 rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-blue-500 text-white"
          />
        </div>
      </div>

      <div className="flex-1 overflow-auto">
        <Table>
          <TableHeader className="bg-zinc-900/50">
            <TableRow className="border-zinc-800 hover:bg-transparent">
              <TableHead className="text-zinc-400">ID</TableHead>
              <TableHead className="text-zinc-400">Customer</TableHead>
              <TableHead className="text-zinc-400">Date & Time</TableHead>
              <TableHead className="text-zinc-400">Purpose</TableHead>
              <TableHead className="text-zinc-400">Status</TableHead>
              <TableHead className="text-zinc-400 text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-zinc-500">Loading bookings...</TableCell>
              </TableRow>
            ) : bookings.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-zinc-500">No bookings found.</TableCell>
              </TableRow>
            ) : (
              bookings.map((bObj: unknown) => {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const b = bObj as any;
                return (
                <TableRow key={b.id} className="border-zinc-800 hover:bg-zinc-900/50 transition-colors">
                  <TableCell className="font-medium text-white">{b.bookingId}</TableCell>
                  <TableCell>
                    <div className="text-white">{b.customerName}</div>
                    <div className="text-xs text-zinc-500">{b.phone}</div>
                  </TableCell>
                  <TableCell>
                    <div className="text-white">{new Date(b.bookingDate).toLocaleDateString()}</div>
                    <div className="text-xs text-zinc-500">{b.startTime} ({b.durationHours} hrs)</div>
                  </TableCell>
                  <TableCell className="text-zinc-300">
                    {b.purpose.replace(/_/g, ' ')}
                  </TableCell>
                  <TableCell>
                    <BookingStatusBadge status={b.status} />
                  </TableCell>
                  <TableCell className="text-right">
                    <Link 
                      href={`/admin/bookings/${b.id}`}
                      className="text-blue-500 hover:text-blue-400 text-sm font-medium"
                    >
                      View
                    </Link>
                  </TableCell>
                </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>

      {meta && meta.totalPages > 1 && (
        <div className="p-4 border-t border-zinc-800 flex justify-between items-center bg-zinc-900/50">
          <span className="text-sm text-zinc-500">Page {meta.page} of {meta.totalPages}</span>
          <div className="flex space-x-2">
            <button 
              disabled={page === 1}
              onClick={() => setPage(p => p - 1)}
              className="px-3 py-1 bg-zinc-800 rounded text-sm disabled:opacity-50"
            >
              Previous
            </button>
            <button 
              disabled={page === meta.totalPages}
              onClick={() => setPage(p => p + 1)}
              className="px-3 py-1 bg-zinc-800 rounded text-sm disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
