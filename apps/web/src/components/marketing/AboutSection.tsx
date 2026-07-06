'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

export function AboutSection() {
  return (
    <section id="about" className="py-24 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Content */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="flex flex-col"
          >
            <div className="mb-8">
              <span className="inline-block border border-[#d946ef] text-[#d946ef] px-3 py-1 text-xs font-bold tracking-widest uppercase rounded-sm">
                About Us
              </span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 leading-tight">
              Built for Creators,<br />By a Creator
            </h2>
            
            <div className="space-y-6 text-sm md:text-base text-zinc-400 leading-relaxed mb-10">
              <p>
                VORTX Studios is a premium recording and content production space in Chennai — designed so that creators spend zero time thinking about logistics and 100% of their time on their message.
              </p>
              <p>
                Whether you&apos;re launching a podcast, shooting brand content, hosting a community session, or filming music and dance productions — the studio is designed to support every phase from concept to final cut.
              </p>
            </div>
            
            {/* Founder Card */}
            <div className="bg-[#121212] border border-zinc-800 rounded-lg p-5 flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#d946ef] flex items-center justify-center text-white font-bold text-sm">
                SA
              </div>
              <div>
                <h4 className="text-white font-semibold text-sm mb-1">Syed Aamir. S</h4>
                <p className="text-zinc-400 text-xs md:text-sm leading-relaxed">
                  Founder & Studio Director — started as a photographer, built VORTX as the studio he always wished existed.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right Image */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="relative h-[400px] md:h-[500px] w-full rounded-2xl overflow-hidden">
              <Image
                src="/images/DSC02965.JPG" // Using the same chair image from hero or another appropriate one
                alt="Vortx Studio Space"
                fill
                className="object-cover"
              />
            </div>
            
            {/* Floating Badge */}
            <div className="absolute bottom-6 right-6 bg-[#121212] border border-zinc-800 rounded-xl p-4 shadow-2xl flex flex-col items-center justify-center min-w-[100px]">
              <span className="text-[#d946ef] text-2xl font-bold mb-1">20+</span>
              <span className="text-zinc-500 text-[9px] font-bold tracking-widest uppercase text-center leading-tight">
                Seats Available
              </span>
            </div>
          </motion.div>
          
        </div>
      </div>
    </section>
  );
}
