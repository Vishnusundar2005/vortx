'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

export function StudioSpacesSection() {
  const spaces = [
    {
      title: "Aesthetic Frame & Accessories",
      description: "Enhance your visual storytelling with our curated selection of aesthetic frames and premium studio accessories. Perfect for adding personality and depth to your podcast or video production.",
      features: [
        "Curated premium accessories",
        "Customizable frame arrangements",
        "Dynamic styling options",
        "Elevated visual aesthetics"
      ],
      image: "/images/DSC03026.JPG", // Using placeholder image from existing ones
      imagePosition: "left"
    },
    {
      title: "Podcast Set",
      description: "Alternative aesthetic with dynamic backgrounds, perfect for video podcasts. Add your own branding with neon accents and customizable lighting.",
      features: [
        "Customized Name on Neon Light",
        "Aesthetic backdrop styling",
        "Professional audio routing"
      ],
      image: "/images/DSC02978.JPG", // Using placeholder image from existing ones
      imagePosition: "right"
    },
    {
      title: "Photo & Video Sets",
      description: "Ample floor space for full standing shots, green screen work, and large groups. Multiple sets, infinite possibilities for your content creation.",
      features: [
        "Motorized triple roller",
        "Customized background",
        "3 Featured different artistic walls"
      ],
      image: "/images/DSC03086.JPG", // Using placeholder image from existing ones
      imagePosition: "left"
    }
  ];

  return (
    <section id="studio-spaces" className="py-24 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-20">
          <div className="mb-8">
            <span className="inline-block border border-[#d946ef] text-[#d946ef] px-3 py-1 text-xs font-bold tracking-widest uppercase rounded-sm">
              Our Spaces
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Studio Spaces
          </h2>
          <div className="w-12 h-[2px] bg-[#d946ef]" />
        </div>

        {/* Spaces Blocks */}
        <div className="space-y-32">
          {spaces.map((space, index) => (
            <div 
              key={index} 
              className={`flex flex-col lg:flex-row items-center gap-16 ${
                space.imagePosition === 'right' ? 'lg:flex-row-reverse' : ''
              }`}
            >
              
              {/* Image Side */}
              <motion.div 
                initial={{ opacity: 0, x: space.imagePosition === 'left' ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="w-full lg:w-1/2"
              >
                <div className="relative h-[350px] md:h-[450px] w-full rounded-2xl overflow-hidden">
                  <Image
                    src={space.image}
                    alt={space.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>
              </motion.div>

              {/* Content Side */}
              <motion.div 
                initial={{ opacity: 0, x: space.imagePosition === 'left' ? 30 : -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="w-full lg:w-1/2 flex flex-col"
              >
                <h3 className="text-3xl font-bold text-white mb-6">{space.title}</h3>
                <p className="text-zinc-400 text-sm md:text-base leading-relaxed mb-8">
                  {space.description}
                </p>
                <ul className="space-y-4">
                  {space.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-zinc-300 text-sm md:text-base">
                      <Check className="text-[#d946ef] mt-1 shrink-0" size={18} />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
