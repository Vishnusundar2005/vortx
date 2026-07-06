'use client';

import { motion } from 'framer-motion';
import { VolumeX, Square, Clock, Lightbulb, MapPin } from 'lucide-react';
import Link from 'next/link';

export function TheStudioSection() {
  const equipment = [
    {
      category: "CAMERA",
      item: "Sony A7 M3 — Full Frame Mirrorless"
    },
    {
      category: "MICROPHONE",
      item: "Hollyland Lark M2 — Wireless Lavalier"
    },
    {
      category: "LIGHTING",
      item: "Softbox • Spotlight • LC • Flash Kit • Hanging Lights • Lamps"
    },
    {
      category: "ACCESSORIES",
      item: "Cam Stand • Props • Rack • Green Screen"
    }
  ];

  return (
    <section className="py-24 bg-black">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          {/* Left Column */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="flex flex-col"
          >
            <div className="mb-6">
              <span className="inline-block border border-[#d946ef] text-[#d946ef] px-3 py-1 text-xs font-bold tracking-widest uppercase rounded-sm bg-[#d946ef]/10">
                The Studio
              </span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-6">
              Professional Grade,<br />Every Detail.
            </h2>
            
            <div className="w-12 h-[2px] bg-[#d946ef] mb-6" />
            
            <p className="text-sm md:text-base text-zinc-400 leading-relaxed mb-10 max-w-lg">
              No compromise on equipment. Every tool in the studio is chosen to ensure your content looks and sounds like it belongs at the top of any platform.
            </p>

            <div className="space-y-4">
              {equipment.map((eq, index) => (
                <div key={index} className="bg-[#121212] border border-zinc-800 rounded-lg p-5 flex items-start gap-4">
                  <div className="mt-1.5 w-2 h-2 rounded-full bg-[#d946ef] shrink-0" />
                  <div>
                    <p className="text-[10px] md:text-xs text-zinc-500 font-bold tracking-widest uppercase mb-1">
                      {eq.category}
                    </p>
                    <p className="text-sm md:text-base text-white font-semibold">
                      {eq.item}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Column */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="flex flex-col gap-4"
          >
            
            {/* Top 4 features grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-[#121212] border border-zinc-800 rounded-lg p-8 flex flex-col items-center justify-center text-center h-40">
                <VolumeX className="text-[#d946ef] mb-3" size={28} />
                <p className="text-xs text-zinc-400 font-medium">Soundproofed<br/>Environment</p>
              </div>
              <div className="bg-[#121212] border border-zinc-800 rounded-lg p-8 flex flex-col items-center justify-center text-center h-40">
                <Square className="text-green-500 mb-3" fill="currentColor" size={24} />
                <p className="text-xs text-zinc-400 font-medium">Green Screen<br/>Available</p>
              </div>
              <div className="bg-[#121212] border border-zinc-800 rounded-lg p-8 flex flex-col items-center justify-center text-center h-40">
                <Clock className="text-[#d946ef] mb-3" size={28} />
                <p className="text-xs text-zinc-400 font-medium">Open 24 Hours<br/>7 Days</p>
              </div>
              <div className="bg-[#121212] border border-zinc-800 rounded-lg p-8 flex flex-col items-center justify-center text-center h-40">
                <Lightbulb className="text-[#d946ef] mb-3" size={28} />
                <p className="text-xs text-zinc-400 font-medium">Full Lighting<br/>Rig Setup</p>
              </div>
            </div>

            {/* Capacity Block */}
            <div className="bg-[#121212] border border-zinc-800 rounded-lg p-8 flex flex-col items-center justify-center text-center">
              <h3 className="text-5xl font-bold text-[#d946ef] mb-2">20</h3>
              <p className="text-[10px] text-zinc-500 font-bold tracking-widest uppercase">
                Maximum Seating Capacity
              </p>
            </div>

            {/* Map/Location Block */}
            <div className="bg-[#121212] border border-zinc-800 rounded-lg p-6 flex flex-col justify-center">
              <div className="flex items-start gap-3 mb-4">
                <MapPin className="text-[#d946ef] shrink-0 mt-0.5" size={16} />
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Dayasadan Street, Pallavan Nagar,<br/>
                  Nerkundram, Chennai — 600107
                </p>
              </div>
              <Link 
                href="https://maps.google.com" 
                target="_blank" 
                className="text-xs font-semibold text-[#d946ef] hover:text-[#c026d3] transition ml-7"
              >
                View on Google Maps &rarr;
              </Link>
            </div>

          </motion.div>
          
        </div>
      </div>
    </section>
  );
}
