import { BookingStatusBadge } from './BookingStatusBadge';

interface Props {
  booking: Record<string, string>;
}

export function BookingSummaryCard({ booking }: Props) {
  return (
    <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-6 w-full text-left">
      <div className="flex justify-between items-center border-b border-zinc-800 pb-4 mb-4">
        <div>
          <p className="text-sm text-zinc-500 mb-1">Booking ID</p>
          <p className="font-medium text-white">{booking.bookingId}</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-zinc-500 mb-1">Status</p>
          <BookingStatusBadge status={booking.status || 'PENDING'} />
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-sm text-zinc-500 mb-1">Date</p>
          <p className="font-medium text-white">{new Date(booking.bookingDate).toLocaleDateString()}</p>
        </div>
        <div>
          <p className="text-sm text-zinc-500 mb-1">Time</p>
          <p className="font-medium text-white">{booking.startTime} - {booking.endTime}</p>
        </div>
      </div>
    </div>
  );
}
