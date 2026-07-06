'use client';

import { motion } from 'framer-motion';
import React from 'react';

interface Props {
  title: string;
  description: string;
  icon: React.ReactNode;
  delay?: number;
}

export function ServiceCard({ title, description, icon, delay = 0 }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -5 }}
      className="bg-[#121212] rounded-xl p-6 md:p-8 h-full flex flex-col hover:bg-[#1a1a1a] transition duration-300 border border-transparent hover:border-zinc-800"
    >
      <div className="text-[#d946ef] mb-5">
        {icon}
      </div>
      <h3 className="text-[15px] font-bold text-white mb-3 tracking-wide">{title}</h3>
      <p className="text-zinc-400 text-xs leading-relaxed flex-grow">{description}</p>
    </motion.div>
  );
}
