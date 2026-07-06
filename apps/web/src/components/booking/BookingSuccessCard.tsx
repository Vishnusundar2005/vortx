import { CheckCircle } from 'lucide-react';

interface Props {
  children: React.ReactNode;
}

export function BookingSuccessCard({ children }: Props) {
  return (
    <div className="text-center py-8 flex flex-col items-center max-w-lg mx-auto">
      <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mb-6">
        <CheckCircle className="text-green-500" size={40} />
      </div>
      
      <h2 className="text-3xl font-bold text-white mb-2">Booking Successful!</h2>
      <p className="text-zinc-400 mb-8 px-4">
        Your booking has been saved with <strong className="text-yellow-500 font-medium">Pending</strong> status. 
        Please send the WhatsApp message so our team can verify and confirm your reservation.
      </p>

      {children}
    </div>
  );
}
