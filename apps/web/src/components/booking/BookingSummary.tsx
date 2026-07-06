'use client';

import { ArrowLeft, CheckCircle2 } from 'lucide-react';
import { CreateBookingData, AvailableSlot } from '@/services/booking.service';
import { useState } from 'react';

interface Props {
  date: Date;
  duration: number;
  slot: AvailableSlot;
  customer: Partial<CreateBookingData>;
  onConfirm: () => Promise<void>;
  onBack: () => void;
}

export function BookingSummary({ date, duration, slot, customer, onConfirm, onBack }: Props) {
  const [loading, setLoading] = useState(false);

  const handleConfirm = async () => {
    setLoading(true);
    await onConfirm();
    setLoading(false);
  };

  const formatPurpose = (str: string) => str.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center mb-6">
        <button onClick={onBack} disabled={loading} className="mr-4 text-zinc-400 hover:text-white transition disabled:opacity-50">
          <ArrowLeft size={24} />
        </button>
        <h2 className="text-xl font-semibold">Booking Summary</h2>
      </div>

      <div className="space-y-6">
        <div className="bg-zinc-950 p-6 rounded-xl border border-zinc-800">
          <h3 className="text-sm text-zinc-400 uppercase tracking-wider mb-4 font-semibold">Session Details</h3>
          <div className="grid grid-cols-2 gap-y-4 text-sm">
            <div>
              <p className="text-zinc-500 mb-1">Date</p>
              <p className="font-medium text-white">{date.toDateString()}</p>
            </div>
            <div>
              <p className="text-zinc-500 mb-1">Time</p>
              <p className="font-medium text-white">{slot.startTime} - {slot.endTime}</p>
            </div>
            <div>
              <p className="text-zinc-500 mb-1">Duration</p>
              <p className="font-medium text-white">{duration} Hours</p>
            </div>
            <div>
              <p className="text-zinc-500 mb-1">Purpose</p>
              <p className="font-medium text-white">{customer.purpose ? formatPurpose(customer.purpose) : '-'}</p>
            </div>
          </div>
        </div>

        <div className="bg-zinc-950 p-6 rounded-xl border border-zinc-800">
          <h3 className="text-sm text-zinc-400 uppercase tracking-wider mb-4 font-semibold">Customer Details</h3>
          <div className="grid grid-cols-2 gap-y-4 text-sm">
            <div>
              <p className="text-zinc-500 mb-1">Name</p>
              <p className="font-medium text-white">{customer.customerName}</p>
            </div>
            <div>
              <p className="text-zinc-500 mb-1">Email</p>
              <p className="font-medium text-white">{customer.email}</p>
            </div>
            <div>
              <p className="text-zinc-500 mb-1">Phone</p>
              <p className="font-medium text-white">{customer.phone}</p>
            </div>
            <div>
              <p className="text-zinc-500 mb-1">Attendees</p>
              <p className="font-medium text-white">{customer.peopleCount} People</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 flex justify-end">
        <button 
          onClick={handleConfirm}
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition flex items-center disabled:opacity-75"
        >
          {loading ? (
            <span className="animate-pulse">Confirming...</span>
          ) : (
            <>
              <CheckCircle2 className="mr-2" size={20} />
              Confirm & Book
            </>
          )}
        </button>
      </div>
    </div>
  );
}
