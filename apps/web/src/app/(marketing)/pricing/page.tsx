import { SectionTitle } from '@/components/marketing/SectionTitle';

export default function PricingPage() {
  return (
    <div className="pt-24 pb-16 bg-black min-h-screen">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <SectionTitle 
          title="Simple, Transparent Pricing" 
          subtitle="No hidden fees. Book what you need, when you need it." 
        />
        
        <div className="max-w-md mx-auto mt-12">
          <div className="bg-zinc-950 rounded-2xl border border-zinc-800 p-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
              Standard Rate
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">Studio Rental</h3>
            <p className="text-zinc-400 mb-6">Full access to our premium studio spaces and standard equipment.</p>
            
            <div className="mb-8">
              <span className="text-5xl font-extrabold text-white">₹1,500</span>
              <span className="text-zinc-400">/hour</span>
            </div>
            
            <ul className="space-y-4 mb-8">
              <li className="flex items-center text-zinc-300">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mr-3"></span> Minimum 2 hours booking
              </li>
              <li className="flex items-center text-zinc-300">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mr-3"></span> Maximum 12 hours booking
              </li>
              <li className="flex items-center text-zinc-300">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mr-3"></span> Access to basic lighting
              </li>
              <li className="flex items-center text-zinc-300">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mr-3"></span> High-speed Wi-Fi
              </li>
            </ul>
            
            <a href="/book" className="block w-full bg-white text-black text-center font-bold py-3 rounded-lg hover:bg-zinc-200 transition">
              Book Now
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
