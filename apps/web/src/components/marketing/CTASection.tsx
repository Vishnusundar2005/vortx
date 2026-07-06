'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Clock, CreditCard, Ban, CalendarCheck, Phone, MapPin } from 'lucide-react';

export function CTASection() {
  const details = [
    { icon: <Clock size={16} />, text: "Minimum booking: 2 hours" },
    { icon: <CreditCard size={16} />, text: "Advance payment required to confirm" },
    { icon: <Ban size={16} />, text: "Advance is non-refundable" },
    { icon: <CalendarCheck size={16} />, text: "Available 7 days a week, 24 hours" },
    { icon: <Phone size={16} />, text: "WhatsApp: 9840039699" },
    { icon: <MapPin size={16} />, text: "Nerkundram, Chennai 600107" }
  ];

  return (
    <section className="py-24 bg-black">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Column */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="flex flex-col"
          >
            <div className="mb-6">
              <span className="inline-block border border-[#d946ef] text-[#d946ef] px-3 py-1 text-[10px] md:text-xs font-bold tracking-widest uppercase rounded-sm bg-[#d946ef]/10">
                Book a Session
              </span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-6">
              Reserve Your<br />Studio Time
            </h2>
            
            <div className="w-12 h-[2px] bg-[#d946ef] mb-6" />
            
            <p className="text-sm md:text-base text-zinc-400 leading-relaxed mb-10 max-w-md">
              Fill in your details and we&apos;ll confirm your slot within 2 hours via WhatsApp or email.
            </p>

            <ul className="space-y-4">
              {details.map((detail, index) => (
                <li key={index} className="flex items-center gap-3 text-xs md:text-sm text-zinc-300">
                  <div className="text-[#d946ef] shrink-0">
                    {detail.icon}
                  </div>
                  <span>{detail.text}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Right Column (Card) */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="bg-[#121212] border border-zinc-800/50 rounded-xl p-10 md:p-14 flex flex-col items-center text-center">
              <div className="bg-[#d946ef]/10 p-4 rounded-full mb-6">
                <CalendarCheck className="text-[#d946ef]" size={40} />
              </div>
              
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                Ready to Book?
              </h3>
              
              <p className="text-xs md:text-sm text-zinc-400 mb-10 max-w-sm mx-auto leading-relaxed">
                Check real-time studio availability and reserve your slot instantly online.
              </p>
              
              <Link 
                href="/book" 
                className="w-full bg-[#d946ef] hover:bg-[#c026d3] text-white font-semibold text-sm md:text-base py-4 rounded-md transition duration-300 block mb-4"
              >
                Book Your Session Now
              </Link>
              
              <p className="text-[10px] md:text-xs text-zinc-600">
                Instant confirmation & WhatsApp support
              </p>
            </div>
          </motion.div>
          
        </div>
      </div>
    </section>
  );
}
