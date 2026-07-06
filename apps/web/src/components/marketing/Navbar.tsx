'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '/#about' },
    { name: 'Services', href: '/services' },
    { name: 'Studio', href: '/studio-spaces' },
    { name: 'Pricing', href: '/pricing' },
    { name: 'FAQ', href: '/faq' },
  ];

  return (
    <header 
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-black/90 backdrop-blur-md border-b border-zinc-800 py-4' : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-xl font-bold tracking-[0.1em] text-[#d946ef] z-50 uppercase">
            VORTX STUDIOS
          </Link>
          
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link key={link.name} href={link.href} className="text-[13px] font-semibold text-zinc-300 hover:text-white transition">
                {link.name}
              </Link>
            ))}
            <Link 
              href="/book" 
              className="bg-[#d946ef] text-white hover:bg-[#c026d3] px-6 py-2 rounded-md font-semibold text-sm transition duration-200"
            >
              Book Now
            </Link>
          </nav>

          <button 
            className="md:hidden z-50 text-white p-2 -mr-2"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 w-full bg-black border-b border-zinc-800 md:hidden"
          >
            <nav className="flex flex-col px-6 py-4 space-y-4">
              {navLinks.map((link) => (
                <Link 
                  key={link.name} 
                  href={link.href} 
                  onClick={() => setIsOpen(false)}
                  className="text-lg font-medium text-zinc-300 hover:text-white"
                >
                  {link.name}
                </Link>
              ))}
              <div className="pt-4 border-t border-zinc-800">
                <Link 
                  href="/book" 
                  onClick={() => setIsOpen(false)}
                  className="block text-center bg-[#d946ef] text-white px-6 py-3 rounded-md font-semibold w-full"
                >
                  Book Now
                </Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

