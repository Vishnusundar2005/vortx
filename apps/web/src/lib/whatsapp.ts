export interface WhatsAppBookingData {
  bookingId: string;
  customerName: string;
  phone: string;
  email: string;
  company?: string;
  purpose: string;
  bookingDate: string;
  startTime: string;
  endTime: string;
  duration: number;
  peopleCount: number;
  notes?: string;
}

const formatPurpose = (str: string) => str.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());

export function generateBookingMessage(data: WhatsAppBookingData): string {
  const companyInfo = data.company ? `\nCompany:\n${data.company}` : '';
  const notesInfo = data.notes ? `\nNotes:\n${data.notes}` : '';
  const dateStr = new Date(data.bookingDate).toDateString();

  return `Hello VORTX Studios 👋

I'd like to confirm my studio booking.

━━━━━━━━━━━━━━━━━━━━━━

Booking ID:
${data.bookingId}

Customer:
${data.customerName}

Phone:
${data.phone}

Email:
${data.email}${companyInfo}

Purpose:
${formatPurpose(data.purpose)}

Booking Date:
${dateStr}

Time:
${data.startTime} - ${data.endTime}

Duration:
${data.duration} Hours

People:
${data.peopleCount}${notesInfo}

━━━━━━━━━━━━━━━━━━━━━━

Please confirm my booking.
Thank you!`;
}

export function encodeWhatsAppMessage(message: string): string {
  return encodeURIComponent(message);
}

export function generateWhatsAppUrl(phoneNumber: string, message: string): string {
  const encodedMessage = encodeWhatsAppMessage(message);
  // Clean phone number (remove non-digits)
  const cleanNumber = phoneNumber.replace(/\D/g, '');
  return `https://wa.me/${cleanNumber}?text=${encodedMessage}`;
}
