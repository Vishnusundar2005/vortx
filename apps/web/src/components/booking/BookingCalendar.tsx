'use client';

import { Calendar } from '@/components/ui/calendar';

interface Props {
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
}

export function BookingCalendar({ date, setDate }: Props) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return (
    <div className="bg-[#121212] border border-zinc-800/50 rounded-xl p-4 flex justify-center h-full dark">
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        disabled={(d) => d < today}
        className="rounded-md"
      />
    </div>
  );
}
