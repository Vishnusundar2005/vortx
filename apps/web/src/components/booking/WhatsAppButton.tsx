'use client';

import { generateWhatsAppUrl, generateBookingMessage, WhatsAppBookingData } from '@/lib/whatsapp';
import { MessageCircle, ExternalLink } from 'lucide-react';

interface Props {
  bookingData: WhatsAppBookingData | null;
  className?: string;
}

export function WhatsAppButton({ bookingData, className = '' }: Props) {
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '919840039699';

  const handleClick = () => {
    if (!whatsappNumber) {
      alert('WhatsApp number is not configured in Business Settings.');
      return;
    }
    if (!bookingData) {
      alert('Booking data is missing. Please try again.');
      return;
    }

    const message = generateBookingMessage(bookingData);
    const url = generateWhatsAppUrl(whatsappNumber, message);
    
    window.open(url, '_blank');
  };

  return (
    <button
      onClick={handleClick}
      className={`bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-medium transition flex items-center justify-center ${className}`}
    >
      <MessageCircle className="mr-2" size={20} />
      Confirm on WhatsApp
      <ExternalLink className="ml-2 opacity-70" size={16} />
    </button>
  );
}
