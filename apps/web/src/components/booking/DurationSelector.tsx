'use client';

interface Props {
  duration: number;
  setDuration: (duration: number) => void;
}

export function DurationSelector({ duration, setDuration }: Props) {
  const durations = Array.from({ length: 11 }, (_, i) => i + 2); // 2 to 12

  return (
    <div className="bg-[#121212] border border-zinc-800/50 rounded-xl p-6 h-full">
      <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
        {durations.map((d) => (
          <button
            key={d}
            onClick={() => setDuration(d)}
            className={`py-3 rounded-lg text-sm font-medium transition-colors border ${
              duration === d
                ? 'bg-[#d946ef] text-white border-[#d946ef]'
                : 'bg-zinc-900/50 text-zinc-300 border-zinc-800 hover:border-[#d946ef]/50 hover:text-white'
            }`}
          >
            {d} Hours
          </button>
        ))}
      </div>
    </div>
  );
}
