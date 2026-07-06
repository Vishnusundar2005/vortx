'use client';

import { useQuery } from '@tanstack/react-query';
import { bookingService } from '@/services/booking.service';
import { useState } from 'react';
import Link from 'next/link';

export default function CalendarPage() {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const { data: bookingsData } = useQuery({
    queryKey: ['admin-bookings-calendar'],
    // Fetch all for a rough calendar view (you'd typically filter by date range in production)
    queryFn: () => bookingService.getAllBookings({ limit: 100 }),
    retry: false,
  });

  const bookings = bookingsData?.data || [];

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const days = new Date(year, month + 1, 0).getDate();
    
    return Array.from({ length: days }, (_, i) => {
      const d = new Date(year, month, i + 1);
      return d;
    });
  };

  const days = getDaysInMonth(currentMonth);

  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white">Booking Calendar</h1>
        <div className="flex space-x-4 items-center">
          <button onClick={prevMonth} className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg">&lt; Prev</button>
          <span className="text-lg font-medium text-white">{currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' })}</span>
          <button onClick={nextMonth} className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg">Next &gt;</button>
        </div>
      </div>

      <div className="flex-1 min-h-0 bg-zinc-950 border border-zinc-800 rounded-xl overflow-hidden flex flex-col">
        <div className="grid grid-cols-7 border-b border-zinc-800 bg-zinc-900/50">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="py-3 text-center text-sm font-medium text-zinc-400 border-r border-zinc-800 last:border-0">
              {day}
            </div>
          ))}
        </div>

        <div className="flex-1 grid grid-cols-7 grid-rows-5 overflow-y-auto">
          {/* Empty cells for padding start of month */}
          {Array.from({ length: days[0].getDay() }).map((_, i) => (
            <div key={`empty-${i}`} className="border-b border-r border-zinc-800/50 bg-zinc-950/50"></div>
          ))}

          {days.map(date => {
            const dateBookings = bookings.filter((bObj: unknown) => {
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              const b = bObj as any;
              return new Date(b.bookingDate).toDateString() === date.toDateString();
            });

            return (
              <div key={date.toISOString()} className="border-b border-r border-zinc-800/50 p-2 min-h-[120px] bg-zinc-950 hover:bg-zinc-900 transition flex flex-col">
                <div className="text-right mb-2">
                  <span className="text-sm text-zinc-500 font-medium">{date.getDate()}</span>
                </div>
                <div className="flex-1 overflow-y-auto space-y-1">
                  {dateBookings.map((bObj: unknown) => {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    const b = bObj as any;
                    return (
                    <Link 
                      key={b.id} 
                      href={`/admin/bookings/${b.id}`}
                      className={`block px-2 py-1 text-xs rounded truncate ${
                        b.status === 'CONFIRMED' ? 'bg-green-500/20 text-green-400' :
                        b.status === 'PENDING' ? 'bg-yellow-500/20 text-yellow-400' :
                        'bg-zinc-800 text-zinc-400'
                      }`}
                    >
                      {b.startTime} - {b.customerName}
                    </Link>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
