import React from 'react';
import { addDays, format, isSameDay, isToday, isTomorrow } from 'date-fns';
import { motion } from 'framer-motion';

interface HorizontalDateSelectorProps {
  selectedDate: Date;
  onSelect: (date: Date) => void;
  daysToShow?: number;
}

export function HorizontalDateSelector({ 
  selectedDate, 
  onSelect,
  daysToShow = 14
}: HorizontalDateSelectorProps) {
  
  const dates = Array.from({ length: daysToShow }).map((_, i) => addDays(new Date(), i));

  const getDayLabel = (date: Date) => {
    if (isToday(date)) return 'TODAY';
    if (isTomorrow(date)) return 'TOMORROW';
    return format(date, 'EEE').toUpperCase(); // e.g., WED
  };

  return (
    <div className="w-full overflow-x-auto pb-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
      <div className="flex gap-4">
        {dates.map((date) => {
          const selected = isSameDay(date, selectedDate);
          
          return (
            <button
              key={date.toISOString()}
              onClick={() => onSelect(date)}
              className={`flex-shrink-0 w-[76px] h-[96px] rounded-2xl flex flex-col items-center justify-center transition-all duration-300 relative border-2 ${
                selected 
                  ? 'border-[#d946ef] bg-[#1a0b1f] shadow-[0_0_20px_rgba(217,70,239,0.15)]' 
                  : 'border-transparent bg-[#1e1e1e] hover:bg-[#252525]'
              }`}
            >
              <span className={`text-[10px] font-bold tracking-widest mb-1 ${selected ? 'text-[#d946ef]' : 'text-zinc-500'}`}>
                {getDayLabel(date)}
              </span>
              <span className={`text-2xl font-bold ${selected ? 'text-white' : 'text-zinc-300'}`}>
                {format(date, 'd')}
              </span>
              <span className={`text-[10px] font-bold tracking-widest mt-1 ${selected ? 'text-[#d946ef]' : 'text-zinc-500'}`}>
                {format(date, 'MMM').toUpperCase()}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
