'use client';

import { motion } from 'framer-motion';

interface Props {
  title: string;
  subtitle?: string;
  alignment?: 'left' | 'center';
}

export function SectionTitle({ title, subtitle, alignment = 'center' }: Props) {
  return (
    <div className={`mb-12 md:mb-16 ${alignment === 'center' ? 'text-center max-w-3xl mx-auto' : 'text-left max-w-2xl'}`}>
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-4"
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-lg md:text-xl text-zinc-400"
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}
