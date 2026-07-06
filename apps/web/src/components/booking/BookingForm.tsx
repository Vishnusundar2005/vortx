'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { ArrowLeft } from 'lucide-react';
import { CreateBookingData } from '@/services/booking.service';

const bookingSchema = z.object({
  customerName: z.string().min(2, 'Name must be at least 2 characters'),
  phone: z.string().min(10, 'Valid phone number required').regex(/^[0-9+\-()\s]+$/, 'Invalid characters in phone number'),
  email: z.string().email('Invalid email address'),
  company: z.string().optional(),
  purpose: z.string().min(1, 'Please select a purpose'),
  peopleCount: z.coerce.number().min(1, 'At least 1 person is required'),
  notes: z.string().optional(),
});

type BookingFormValues = z.infer<typeof bookingSchema>;

interface Props {
  defaultValues?: Partial<CreateBookingData>;
  onSubmit: (data: Partial<CreateBookingData>) => void;
  onBack: () => void;
}

const purposes = [
  'PODCAST_RECORDING', 'VIDEO_PODCAST', 'PHOTOGRAPHY', 'VIDEOGRAPHY',
  'MUSIC_VIDEO', 'DANCE_VIDEO', 'LIVE_STREAMING', 'CORPORATE_MEETING',
  'COMMUNITY_EVENT', 'WORKSHOP', 'OTHER'
];

const formatPurpose = (str: string) => str.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());

export function BookingForm({ defaultValues, onSubmit, onBack }: Props) {
  const { register, handleSubmit, formState: { errors } } = useForm<BookingFormValues>({
    // @ts-expect-error Bypass Zod type inference due to coercion issues
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      customerName: defaultValues?.customerName || '',
      phone: defaultValues?.phone || '',
      email: defaultValues?.email || '',
      company: defaultValues?.company || '',
      purpose: defaultValues?.purpose || '',
      peopleCount: defaultValues?.peopleCount || 1,
      notes: defaultValues?.notes || '',
    },
  });

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center mb-6">
        <button onClick={onBack} className="mr-4 text-zinc-400 hover:text-white transition">
          <ArrowLeft size={24} />
        </button>
        <h2 className="text-xl font-semibold">Customer Details</h2>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-zinc-400 mb-1">Full Name *</label>
            <input
              {...register('customerName')}
              className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-lg focus:outline-none focus:border-blue-500"
            />
            {errors.customerName && <p className="text-red-500 text-xs mt-1">{errors.customerName.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-400 mb-1">Phone Number *</label>
            <input
              {...register('phone')}
              className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-lg focus:outline-none focus:border-blue-500"
            />
            {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-400 mb-1">Email Address *</label>
            <input
              type="email"
              {...register('email')}
              className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-lg focus:outline-none focus:border-blue-500"
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-400 mb-1">Company / Brand</label>
            <input
              {...register('company')}
              className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-lg focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-400 mb-1">Booking Purpose *</label>
            <select
              {...register('purpose')}
              className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-lg focus:outline-none focus:border-blue-500 text-white"
            >
              <option value="">Select purpose...</option>
              {purposes.map(p => <option key={p} value={p}>{formatPurpose(p)}</option>)}
            </select>
            {errors.purpose && <p className="text-red-500 text-xs mt-1">{errors.purpose.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-400 mb-1">Number of People *</label>
            <input
              type="number"
              min="1"
              {...register('peopleCount')}
              className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-lg focus:outline-none focus:border-blue-500"
            />
            {errors.peopleCount && <p className="text-red-500 text-xs mt-1">{errors.peopleCount.message}</p>}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-zinc-400 mb-1">Additional Notes</label>
          <textarea
            {...register('notes')}
            rows={3}
            className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-lg focus:outline-none focus:border-blue-500 resize-none"
          ></textarea>
        </div>

        <div className="pt-4 flex justify-end">
          <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition">
            Continue to Summary
          </button>
        </div>
      </form>
    </div>
  );
}
