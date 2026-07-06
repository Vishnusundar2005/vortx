import { BookingTable } from '@/components/admin/BookingTable';

export default function BookingsPage() {
  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col">
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white">Bookings</h1>
      </div>
      <div className="flex-1 min-h-0">
        <BookingTable />
      </div>
    </div>
  );
}
