import { SectionTitle } from '@/components/marketing/SectionTitle';
import { MapPin, Phone, Mail } from 'lucide-react';

export default function ContactPage() {
  return (
    <div className="pt-24 pb-16 bg-black min-h-screen">
      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        <SectionTitle title="Contact Us" subtitle="Get in touch for custom requirements or general inquiries." />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-12">
          <div className="space-y-8">
            <div className="flex items-start">
              <div className="bg-zinc-900 p-3 rounded-lg text-blue-500 mr-4">
                <MapPin size={24} />
              </div>
              <div>
                <h4 className="text-white font-bold mb-1">Studio Location</h4>
                <p className="text-zinc-400">VORTX Studios<br />Chennai, Tamil Nadu<br />India</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="bg-zinc-900 p-3 rounded-lg text-blue-500 mr-4">
                <Phone size={24} />
              </div>
              <div>
                <h4 className="text-white font-bold mb-1">Phone / WhatsApp</h4>
                <p className="text-zinc-400">+91 00000 00000</p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="bg-zinc-900 p-3 rounded-lg text-blue-500 mr-4">
                <Mail size={24} />
              </div>
              <div>
                <h4 className="text-white font-bold mb-1">Email</h4>
                <p className="text-zinc-400">hello@vortxstudios.com</p>
              </div>
            </div>
          </div>
          
          <div className="bg-zinc-950 p-8 rounded-2xl border border-zinc-800">
            <h3 className="text-xl font-bold text-white mb-6">Send us a message</h3>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-zinc-400 mb-1">Name</label>
                <input type="text" className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2 text-white outline-none focus:border-blue-500 transition" />
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-400 mb-1">Email</label>
                <input type="email" className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2 text-white outline-none focus:border-blue-500 transition" />
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-400 mb-1">Message</label>
                <textarea rows={4} className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2 text-white outline-none focus:border-blue-500 transition"></textarea>
              </div>
              <button type="button" className="w-full bg-white text-black font-bold py-3 rounded-lg hover:bg-zinc-200 transition">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
