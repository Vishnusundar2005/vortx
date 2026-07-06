'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

export function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center pt-24 pb-16 overflow-hidden bg-black">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/DSC02965.JPG"
          alt="Vortx Studio Background"
          fill
          className="object-cover object-center opacity-75"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/75 pointer-events-none" />
      </div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10 text-center flex flex-col items-center mt-12">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-[#d946ef] text-xs md:text-sm font-bold tracking-[0.2em] uppercase mb-6"
        >
          Chennai&apos;s Premium Content Studio
        </motion.p>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-5xl md:text-7xl lg:text-[5.5rem] font-bold tracking-tight text-white mb-6 leading-tight"
        >
          Where Ideas Meet <br className="hidden md:block" />
          <span className="text-[#d946ef]">
            Execution
          </span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-base md:text-lg text-zinc-300 max-w-2xl mx-auto mb-10 leading-relaxed font-normal"
        >
          A professional podcast and personal branding studio built for
          creators who are serious about their craft — recording,
          production, editing, and beyond.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20"
        >
          <Link 
            href="/book" 
            className="w-full sm:w-auto bg-[#d946ef] text-white hover:bg-[#c026d3] px-8 py-3.5 rounded-md font-semibold text-sm md:text-base transition duration-300"
          >
            Book a Session
          </Link>
          <Link 
            href="/services" 
            className="w-full sm:w-auto bg-transparent border border-zinc-800 text-zinc-300 hover:text-white hover:bg-zinc-900 px-8 py-3.5 rounded-md font-semibold text-sm md:text-base transition duration-300"
          >
            Explore Studio
          </Link>
        </motion.div>

        {/* Stats Row */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-16 text-center"
        >
          <div className="flex flex-col items-center justify-center">
            <h3 className="text-3xl md:text-4xl font-bold text-[#d946ef] mb-2">24/7</h3>
            <p className="text-[10px] md:text-xs text-zinc-500 font-bold tracking-widest uppercase">Open Always</p>
          </div>
          <div className="flex flex-col items-center justify-center">
            <h3 className="text-3xl md:text-4xl font-bold text-[#d946ef] mb-2">20+</h3>
            <p className="text-[10px] md:text-xs text-zinc-500 font-bold tracking-widest uppercase">Seating Capacity</p>
          </div>
          <div className="flex flex-col items-center justify-center">
            <h3 className="text-3xl md:text-4xl font-bold text-[#d946ef] mb-2">₹1200</h3>
            <p className="text-[10px] md:text-xs text-zinc-500 font-bold tracking-widest uppercase">Per Hour</p>
          </div>
          <div className="flex flex-col items-center justify-center">
            <h3 className="text-3xl md:text-4xl font-bold text-[#d946ef] mb-2">7</h3>
            <p className="text-[10px] md:text-xs text-zinc-500 font-bold tracking-widest uppercase">Days A Week</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
