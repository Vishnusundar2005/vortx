import React from 'react';
import { format } from 'date-fns';
import { CheckCircle2, Lock } from 'lucide-react';
import { AvailableSlot } from '@/services/booking.service';
import { formatTime12h } from '@/lib/utils';

interface StickySummaryProps {
  date: Date;
  slot: AvailableSlot | null;
  duration: number;
  loading: boolean;
  onConfirm: () => void;
}

export function StickySummary({ date, slot, duration, loading, onConfirm }: StickySummaryProps) {
  
  const canConfirm = !!slot && duration > 0 && !loading;

  return (
    <div className="bg-[#12101a] border border-[#271e33] rounded-3xl p-6 md:p-8 sticky top-32 shadow-[0_0_30px_rgba(217,70,239,0.05)] w-full max-w-[380px] mx-auto md:mx-0">
      
      <div className="flex items-center gap-3 mb-10">
        <CheckCircle2 className="text-[#d946ef]" size={24} />
        <h2 className="text-2xl font-bold tracking-tight text-white">Summary</h2>
      </div>

      <div className="space-y-8 mb-10">
        <div className="flex justify-between items-center border-b border-white/5 pb-4">
          <span className="text-[10px] font-bold tracking-widest text-zinc-400">DATE & TIME</span>
          <div className="text-right flex flex-col items-end">
            <span className="text-sm font-semibold text-white">
              {slot ? `${formatTime12h(slot.startTime)} - ${formatTime12h(slot.endTime)}` : '--:--'}
            </span>
            <span className="text-[10px] text-[#d946ef] font-semibold mt-1">
              {format(date, 'EEEE, MMM do')}
            </span>
          </div>
        </div>

        <div className="flex justify-between items-center border-b border-white/5 pb-4">
          <span className="text-[10px] font-bold tracking-widest text-zinc-400">DURATION</span>
          <span className="text-sm font-semibold text-white">
            {duration > 0 ? `${duration} Hours` : '---'}
          </span>
        </div>
      </div>

      <button
        onClick={onConfirm}
        disabled={!canConfirm}
        className="w-full bg-[#d946ef] hover:bg-[#c026d3] disabled:opacity-50 disabled:hover:bg-[#d946ef] text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all duration-300 group"
      >
        Confirm Booking
        <span className="group-hover:translate-x-1 transition-transform">&gt;</span>
      </button>

      <div className="mt-4 flex items-center justify-center gap-2 text-[9px] tracking-widest font-bold text-zinc-500">
        <Lock size={10} />
        SECURE CHECKOUT ENABLED
      </div>
    </div>
  );
}
