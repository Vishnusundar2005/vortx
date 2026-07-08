import { SectionTitle } from '@/components/marketing/SectionTitle';

export default function TermsPage() {
  return (
    <div className="pt-24 pb-16 bg-black min-h-screen">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        <SectionTitle title="Terms & Conditions" alignment="left" />
        
        <div className="prose prose-invert prose-zinc max-w-none">
          <p className="text-zinc-400">Last updated: July 8, 2026</p>
          
          <h3 className="text-white font-bold mt-8 mb-4">1. Booking and Payments</h3>
          <p className="text-zinc-400">
            All bookings require a minimum of 2 hours. Your slot is only confirmed once the required advance payment percentage is fulfilled via our WhatsApp communication channel. Bookings made without payment completion will remain pending and may be cancelled.
          </p>
          
          <h3 className="text-white font-bold mt-8 mb-4">2. Cancellations and Rescheduling</h3>
          <p className="text-zinc-400">
            Cancellations must be made at least 48 hours prior to the scheduled booking time for a full refund of the advance payment. Rescheduling requests are subject to availability and must be communicated via WhatsApp.
          </p>

          <h3 className="text-white font-bold mt-8 mb-4">3. Studio Usage and Damages</h3>
          <p className="text-zinc-400">
            Clients are expected to treat the studio and its equipment with care. Any damage to the cyclorama wall, equipment, or facility caused by negligence will be billed directly to the client who made the booking. The studio must be vacated at the exact end time of your booking to accommodate subsequent clients.
          </p>
          
          <h3 className="text-white font-bold mt-8 mb-4">4. Liability</h3>
          <p className="text-zinc-400">
            VORTX Studios is not responsible for any lost, stolen, or damaged personal property brought into the studio by the client or their crew.
          </p>
        </div>
      </div>
    </div>
  );
}
