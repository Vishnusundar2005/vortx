'use client';

import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import Link from 'next/link';

export function PricingSection() {
  const plans = [
    {
      name: "STUDIO RENTAL",
      price: "1,200",
      prefix: "₹",
      subtext: "per hour - 2-hour minimum",
      features: [
        "Full studio access",
        "All lighting equipment",
        "Camera & mic setup",
        "Green screen access",
        "Up to 20 attendees"
      ],
      buttonText: "Book Studio",
      buttonLink: "/book",
      footerNote: "Advance is non-refundable",
      popular: false
    },
    {
      name: "PODCAST PRODUCTION",
      price: "Custom",
      prefix: "₹",
      subtext: "tailored per episode / package",
      features: [
        "Multi-camera video podcast",
        "Audio + video recording",
        "Post-production editing",
        "Thumbnail & graphics",
        "Social media cuts & reels"
      ],
      buttonText: "Get a Quote",
      buttonLink: "/contact",
      footerNote: "Packages available for ongoing shows",
      popular: true
    },
    {
      name: "EDITING & REELS",
      price: "Custom",
      prefix: "₹",
      subtext: "per project",
      features: [
        "Video editing & colour grade",
        "Reel / Shorts creation",
        "Audiogram production",
        "Caption & subtitle overlay",
        "Platform-ready export"
      ],
      buttonText: "Enquire Now",
      buttonLink: "/contact",
      footerNote: "Bring your raw footage or shoot here",
      popular: false
    }
  ];

  return (
    <section id="pricing" className="py-24 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-16 max-w-2xl">
          <div className="mb-6">
            <span className="inline-block border border-[#d946ef] text-[#d946ef] px-3 py-1 text-xs font-bold tracking-widest uppercase rounded-sm bg-[#d946ef]/10">
              Pricing
            </span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-6">
            Transparent Rates.<br />No Surprises.
          </h2>
          
          <div className="w-12 h-[2px] bg-[#d946ef] mb-6" />
          
          <p className="text-sm md:text-base text-zinc-400 leading-relaxed max-w-md">
            All bookings have a 2-hour minimum. Advance payment required to confirm your slot.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative bg-[#121212] rounded-xl p-8 flex flex-col ${
                plan.popular ? 'border-2 border-[#d946ef]' : 'border border-zinc-800'
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#d946ef] text-white text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-full">
                  Most Popular
                </div>
              )}
              
              <h3 className="text-xs font-bold text-zinc-500 tracking-widest uppercase mb-4">
                {plan.name}
              </h3>
              
              <div className="flex items-start gap-1 mb-2">
                <span className="text-xl font-bold text-zinc-400 mt-2">{plan.prefix}</span>
                <span className="text-5xl font-bold text-white">{plan.price}</span>
              </div>
              
              <p className="text-xs text-zinc-500 mb-8">
                {plan.subtext}
              </p>
              
              <ul className="space-y-4 mb-10 flex-grow">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-xs md:text-sm text-zinc-300">
                    <Check className="text-[#d946ef] shrink-0" size={16} />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              
              <Link 
                href={plan.buttonLink} 
                className="w-full bg-[#d946ef] hover:bg-[#c026d3] text-white font-semibold text-sm py-3 rounded-md transition duration-300 text-center mb-4 block"
              >
                {plan.buttonText}
              </Link>
              
              <p className="text-center text-[10px] text-zinc-600">
                {plan.footerNote}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
