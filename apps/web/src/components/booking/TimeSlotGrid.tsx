import React from 'react';
import { AvailableSlot } from '@/services/booking.service';

interface TimeSlotGridProps {
  slots: AvailableSlot[];
  loading: boolean;
  selectedSlot: AvailableSlot | null;
  onSelect: (slot: AvailableSlot) => void;
}

export function TimeSlotGrid({ slots, loading, selectedSlot, onSelect }: TimeSlotGridProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
        {Array.from({ length: 10 }).map((_, i) => (
          <div key={i} className="h-[68px] rounded-xl bg-zinc-800/50 animate-pulse"></div>
        ))}
      </div>
    );
  }

  if (slots.length === 0) {
    return (
      <div className="text-zinc-500 py-8 text-center text-sm">
        No slots available for this date and duration.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3 max-h-[400px] overflow-y-auto pr-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
      {slots.map((slot, i) => {
        const isSelected = selectedSlot?.startTime === slot.startTime;

        return (
          <button
            key={i}
            onClick={() => onSelect(slot)}
            className={`h-[68px] flex flex-col items-center justify-center rounded-xl transition-all duration-300 ${
              isSelected
                ? 'bg-[#d946ef] text-white shadow-[0_0_15px_rgba(217,70,239,0.3)]'
                : 'bg-[#1e1e1e] hover:bg-[#252525] text-zinc-300'
            }`}
          >
            <span className="text-sm font-bold tracking-wide">
              {slot.startTime}
            </span>
            <span
              className={`text-[9px] mt-1 tracking-widest font-semibold ${
                isSelected ? 'text-white/90' : 'text-zinc-500'
              }`}
            >
              AVAILABLE
            </span>
          </button>
        );
      })}
    </div>
  );
}
