'use client';

import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { HorizontalDateSelector } from '@/components/booking/HorizontalDateSelector';
import { TimeSlotGrid } from '@/components/booking/TimeSlotGrid';
import { BookingDetailsForm, BookingFormData } from '@/components/booking/BookingDetailsForm';
import { StickySummary } from '@/components/booking/StickySummary';
import { BookingSuccess } from '@/components/booking/BookingSuccess';
import { AvailableSlot, bookingService, CreateBookingData } from '@/services/booking.service';
import { Navbar } from '@/components/marketing/Navbar';

export default function BookPage() {
  const [mounted, setMounted] = useState(false);
  const [bookingDate, setBookingDate] = useState<Date>(new Date());
  const [selectedSlot, setSelectedSlot] = useState<AvailableSlot | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);
  
  const [formData, setFormData] = useState<BookingFormData>({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    duration: 2,
    peopleCount: 1,
    purpose: 'PODCAST_RECORDING',
  });

  const [availableSlots, setAvailableSlots] = useState<AvailableSlot[]>([]);
  const [slotsLoading, setSlotsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingResult, setBookingResult] = useState<Record<string, string> | null>(null);

  // Fetch slots whenever date or duration changes
  useEffect(() => {
    let mounted = true;
    setSlotsLoading(true);
    setSelectedSlot(null); // Reset selected slot if parameters change

    // Assume the backend is running and we can fetch slots
    bookingService
      .getAvailability({ date: format(bookingDate, 'yyyy-MM-dd'), duration: formData.duration || 1 })
      .then((data) => {
        if (mounted) {
          setAvailableSlots(data);
          setSlotsLoading(false);
        }
      })
      .catch((err) => {
        console.error(err);
        if (mounted) {
          setAvailableSlots([]);
          setSlotsLoading(false);
        }
      });

    return () => {
      mounted = false;
    };
  }, [bookingDate, formData.duration]);

  const handleConfirmBooking = async () => {
    if (!bookingDate || !selectedSlot || !formData.firstName || !formData.lastName || !formData.email || !formData.phone) {
      alert("Please fill in all required fields");
      return;
    }
    
    setIsSubmitting(true);
    
    const payload: CreateBookingData = {
      customerName: `${formData.firstName} ${formData.lastName}`,
      phone: formData.phone,
      email: formData.email,
      peopleCount: formData.peopleCount,
      purpose: formData.purpose,
      bookingDate: format(bookingDate, 'yyyy-MM-dd'),
      startTime: selectedSlot.startTime,
      durationHours: formData.duration,
    };

    try {
      const result = await bookingService.createBooking(payload);
      setBookingResult(result);
    } catch (error) {
      console.error(error);
      alert("Failed to confirm booking. Please check your network connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const StepHeader = ({ num, title }: { num: number, title: string }) => (
    <div className="flex items-center gap-3 mb-6">
      <div className="w-6 h-6 rounded-full bg-[#d946ef] flex items-center justify-center text-[10px] font-bold text-white">
        {num}
      </div>
      <h3 className="text-xl font-bold text-white tracking-tight">{title}</h3>
    </div>
  );

  if (!mounted) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col items-center pt-32 pb-12 px-4">
        <Navbar />
        <div className="animate-pulse space-y-8 w-full max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8 mt-12">
          <div className="space-y-3">
            <div className="h-10 bg-zinc-800/50 rounded w-1/3"></div>
            <div className="h-4 bg-zinc-800/50 rounded w-1/4"></div>
          </div>
          <div className="h-24 bg-zinc-800/50 rounded-2xl"></div>
          <div className="flex flex-col lg:flex-row gap-10">
            <div className="flex-1 space-y-6">
              <div className="h-32 bg-zinc-800/50 rounded-2xl"></div>
              <div className="h-48 bg-zinc-800/50 rounded-2xl"></div>
            </div>
            <div className="w-full lg:w-80 h-64 bg-zinc-800/50 rounded-2xl"></div>
          </div>
        </div>
      </div>
    );
  }

  if (bookingResult) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col items-center pt-32 pb-12 px-4">
        <Navbar />
        <BookingSuccess booking={bookingResult} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-sans selection:bg-[#d946ef]/30 overflow-x-hidden">
      <Navbar />
      <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-[1100px] mx-auto w-full">
        
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-3">
            Book Your <span className="text-[#d946ef]">Session</span>
          </h1>
          <div className="flex items-center gap-2 text-xs font-semibold tracking-widest text-zinc-400">
            <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
            STUDIO AVAILABLE 24/7
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex flex-col lg:flex-row gap-10 xl:gap-16 items-start">
          
          {/* Left Column (Steps) */}
          <div className="flex-1 min-w-0 space-y-12">
            
            {/* Step 1: Select Date */}
            <section>
              <StepHeader num={1} title="Select Date" />
              <HorizontalDateSelector 
                selectedDate={bookingDate} 
                onSelect={setBookingDate} 
              />
            </section>

            {/* Step 2: Select Time */}
            <section>
              <StepHeader num={2} title="Select Time" />
              <TimeSlotGrid 
                slots={availableSlots} 
                loading={slotsLoading} 
                selectedSlot={selectedSlot} 
                onSelect={setSelectedSlot} 
              />
            </section>

            {/* Step 3: Your Details */}
            <section>
              <StepHeader num={3} title="Your Details" />
              <BookingDetailsForm 
                data={formData} 
                onChange={setFormData} 
              />
            </section>

          </div>

          {/* Right Column (Sidebar Summary) */}
          <div className="w-full lg:w-[340px] xl:w-[360px] shrink-0 mt-8 lg:mt-0">
            <StickySummary 
              date={bookingDate}
              slot={selectedSlot}
              duration={formData.duration}
              loading={slotsLoading || isSubmitting}
              onConfirm={handleConfirmBooking}
            />
          </div>

        </div>
      </div>
    </div>
  );
}
