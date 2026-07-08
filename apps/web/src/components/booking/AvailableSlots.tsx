'use client';

import { useEffect, useState } from 'react';
import { AvailableSlot, bookingService } from '@/services/booking.service';
import { ArrowLeft, Clock } from 'lucide-react';
import { formatTime12h } from '@/lib/utils';
import { format } from 'date-fns';

interface Props {
  date: Date;
  duration: number;
  onSelect: (slot: AvailableSlot) => void;
  onBack: () => void;
}

export function AvailableSlots({ date, duration, onSelect, onBack }: Props) {
  const [slots, setSlots] = useState<AvailableSlot[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    setLoading(true);

    bookingService
      .getAvailability({ date: format(date, 'yyyy-MM-dd'), duration })
      .then((data) => {
        if (mounted) {
          setSlots(data);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.error(err);
        if (mounted) setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, [date, duration]);

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center mb-6">
        <button onClick={onBack} className="mr-4 text-zinc-400 hover:text-white transition">
          <ArrowLeft size={24} />
        </button>
        <h2 className="text-xl font-semibold">Select Time</h2>
      </div>

      <div className="mb-6 px-4 py-3 bg-blue-900/20 border border-blue-900/50 rounded-lg text-blue-200 text-sm flex items-center">
        <Clock className="mr-2" size={18} />
        Showing slots for {date.toLocaleDateString()} ({duration} Hours)
      </div>

      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 animate-pulse">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="h-12 bg-zinc-800 rounded-lg"></div>
          ))}
        </div>
      ) : slots.length === 0 ? (
        <div className="text-center py-12 text-zinc-400">
          <p>No available slots found for this date and duration.</p>
          <button onClick={onBack} className="mt-4 text-blue-400 hover:underline">
            Try a different date
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 overflow-y-auto max-h-[400px] pr-2">
          {slots.map((slot, i) => (
            <button
              key={i}
              onClick={() => onSelect(slot)}
              className="flex flex-col items-center justify-center p-3 rounded-lg border border-zinc-700 bg-zinc-900 hover:bg-zinc-800 hover:border-blue-500 transition"
            >
              <span className="font-medium text-white">{formatTime12h(slot.startTime)}</span>
              <span className="text-xs text-zinc-500 mt-1">to {formatTime12h(slot.endTime)}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
