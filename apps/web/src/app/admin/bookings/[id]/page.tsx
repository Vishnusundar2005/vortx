'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { bookingService } from '@/services/booking.service';
import { BookingStatusBadge } from '@/components/booking/BookingStatusBadge';
import { useParams } from 'next/navigation';
import { ArrowLeft, Check, X } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

export default function BookingDetailsPage() {
  const params = useParams();
  const queryClient = useQueryClient();
  const id = params.id as string;
  const [isUpdating, setIsUpdating] = useState(false);

  const { data: booking, isLoading, error } = useQuery({
    queryKey: ['booking', id],
    queryFn: () => bookingService.getBookingById(id),
  });

  const updateStatusMutation = useMutation({
    mutationFn: (status: string) => bookingService.updateBookingStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['booking', id] });
      queryClient.invalidateQueries({ queryKey: ['admin-bookings'] });
      queryClient.invalidateQueries({ queryKey: ['dashboard-stats'] });
    },
  });

  const handleStatusChange = async (status: string) => {
    setIsUpdating(true);
    await updateStatusMutation.mutateAsync(status);
    setIsUpdating(false);
  };

  if (isLoading) return <div className="animate-pulse">Loading booking details...</div>;
  if (error || !booking) return <div className="text-red-500">Failed to load booking.</div>;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center space-x-4 mb-8">
        <Link href="/admin/bookings" className="text-zinc-400 hover:text-white transition">
          <ArrowLeft size={24} />
        </Link>
        <h1 className="text-2xl font-bold text-white flex items-center gap-4">
          Booking {booking.bookingId}
          <BookingStatusBadge status={booking.status} />
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-6">
          <h2 className="text-lg font-semibold text-white mb-4 border-b border-zinc-800 pb-2">Customer Details</h2>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-zinc-500">Name</p>
              <p className="font-medium text-white">{booking.customerName}</p>
            </div>
            <div>
              <p className="text-sm text-zinc-500">Phone</p>
              <p className="font-medium text-white">{booking.phone}</p>
            </div>
            <div>
              <p className="text-sm text-zinc-500">Email</p>
              <p className="font-medium text-white">{booking.email}</p>
            </div>
            {booking.company && (
              <div>
                <p className="text-sm text-zinc-500">Company</p>
                <p className="font-medium text-white">{booking.company}</p>
              </div>
            )}
          </div>
        </div>

        <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-6">
          <h2 className="text-lg font-semibold text-white mb-4 border-b border-zinc-800 pb-2">Session Information</h2>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-zinc-500">Date</p>
              <p className="font-medium text-white">{new Date(booking.bookingDate).toLocaleDateString()}</p>
            </div>
            <div>
              <p className="text-sm text-zinc-500">Time</p>
              <p className="font-medium text-white">{booking.startTime} - {booking.endTime} ({booking.durationHours} hrs)</p>
            </div>
            <div>
              <p className="text-sm text-zinc-500">Purpose</p>
              <p className="font-medium text-white">{booking.purpose.replace(/_/g, ' ')}</p>
            </div>
            <div>
              <p className="text-sm text-zinc-500">People</p>
              <p className="font-medium text-white">{booking.peopleCount}</p>
            </div>
          </div>
        </div>
      </div>

      {booking.notes && (
        <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-6">
          <h2 className="text-lg font-semibold text-white mb-4 border-b border-zinc-800 pb-2">Notes</h2>
          <p className="text-zinc-300 whitespace-pre-wrap">{booking.notes}</p>
        </div>
      )}

      <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-6">
        <h2 className="text-lg font-semibold text-white mb-4 border-b border-zinc-800 pb-2">Actions</h2>
        <div className="flex flex-wrap gap-4">
          <button
            onClick={() => handleStatusChange('CONFIRMED')}
            disabled={isUpdating || booking.status === 'CONFIRMED'}
            className="flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 disabled:opacity-50 text-white rounded-lg transition"
          >
            <Check size={18} className="mr-2" /> Confirm
          </button>
          <button
            onClick={() => handleStatusChange('COMPLETED')}
            disabled={isUpdating || booking.status === 'COMPLETED'}
            className="flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white rounded-lg transition"
          >
            <Check size={18} className="mr-2" /> Complete
          </button>
          <button
            onClick={() => handleStatusChange('CANCELLED')}
            disabled={isUpdating || booking.status === 'CANCELLED'}
            className="flex items-center px-4 py-2 bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white rounded-lg transition"
          >
            <X size={18} className="mr-2" /> Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
