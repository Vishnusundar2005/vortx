'use client';

import Link from 'next/link';
import { BookingSuccessCard } from './BookingSuccessCard';
import { BookingSummaryCard } from './BookingSummaryCard';
import { WhatsAppButton } from './WhatsAppButton';

interface Props {
  booking: Record<string, string> | null;
}

export function BookingSuccess({ booking }: Props) {
  if (!booking) return null;

  return (
    <BookingSuccessCard>
      <div className="w-full mb-8">
        <BookingSummaryCard booking={booking} />
      </div>

      <div className="flex flex-col gap-4 w-full sm:w-auto">
        {/* @ts-expect-error Bypass booking object cast temporarily */}
        <WhatsAppButton bookingData={booking} className="w-full" />
        
        <div className="flex flex-col sm:flex-row gap-4 mt-2">
          <button
            onClick={() => window.location.reload()}
            className="flex-1 bg-zinc-800 hover:bg-zinc-700 text-white px-6 py-3 rounded-lg font-medium transition"
          >
            Book Another Session
          </button>
          <Link 
            href="/"
            className="flex-1 bg-zinc-800 hover:bg-zinc-700 text-white px-6 py-3 rounded-lg font-medium transition text-center"
          >
            Go Home
          </Link>
        </div>
      </div>
    </BookingSuccessCard>
  );
}
