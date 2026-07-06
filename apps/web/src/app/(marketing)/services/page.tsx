'use client';

import { motion } from 'framer-motion';
import { CTASection } from '@/components/marketing/CTASection';
import { 
  Mic, 
  Video, 
  Camera, 
  Film, 
  Music, 
  Users, 
  MonitorPlay, 
  Presentation,
  Box,
  ArrowRight
} from 'lucide-react';
import Link from 'next/link';

const serviceCategories = [
  {
    title: "Audio & Podcasting",
    description: "Acoustically perfect environments built for crystal clear sound.",
    services: [
      { 
        icon: <Mic className="w-8 h-8" />, 
        title: "Podcast Recording", 
        desc: "Acoustically treated rooms with multi-mic setups, Shure SM7B microphones, and high-end interfaces." 
      },
      { 
        icon: <Video className="w-8 h-8" />, 
        title: "Video Podcast", 
        desc: "Multi-camera switching and aesthetic backdrops for modern video podcasts, fully lit and ready to record." 
      }
    ]
  },
  {
    title: "Visual Production",
    description: "Incredible sets, lighting, and cycloramas for your next visual masterpiece.",
    services: [
      { 
        icon: <Camera className="w-8 h-8" />, 
        title: "Photography", 
        desc: "Spacious areas with diverse backdrops, professional strobes, and continuous lighting setups." 
      },
      { 
        icon: <Film className="w-8 h-8" />, 
        title: "Videography", 
        desc: "Ideal for commercials, interviews, and short films with fully soundproofed environments." 
      },
      { 
        icon: <Music className="w-8 h-8" />, 
        title: "Music Video", 
        desc: "Dynamic RGB lighting, haze machines, and stage setups to capture your performance perfectly." 
      },
      { 
        icon: <Users className="w-8 h-8" />, 
        title: "Dance Video", 
        desc: "Sprung floors, mirrored walls, and wide open spaces for complex choreography." 
      }
    ]
  },
  {
    title: "Events & Corporate",
    description: "Versatile spaces tailored for streaming, teaching, and connecting.",
    services: [
      { 
        icon: <MonitorPlay className="w-8 h-8" />, 
        title: "Live Streaming", 
        desc: "High-speed redundant internet and dedicated streaming PCs for zero-drop global broadcasts." 
      },
      { 
        icon: <Users className="w-8 h-8" />, 
        title: "Community Event", 
        desc: "Versatile layouts for workshops, intimate gigs, and small creative gatherings." 
      },
      { 
        icon: <Presentation className="w-8 h-8" />, 
        title: "Corporate Meeting", 
        desc: "Professional environments with 4K presentation equipment and premium conferencing audio." 
      },
      { 
        icon: <Box className="w-8 h-8" />, 
        title: "Product Shoot", 
        desc: "Macro lighting, turntables, and infinite white curves for crisp product imagery." 
      }
    ]
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" }
  }
};

export default function ServicesPage() {
  return (
    <div className="bg-[#0a0a0a] min-h-screen text-white selection:bg-[#d946ef]/30">
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#d946ef]/5 to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-sm text-zinc-300 mb-6">
              <span className="w-2 h-2 rounded-full bg-[#d946ef] animate-pulse" />
              Creative Capabilities
            </div>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
              Production <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-zinc-500">Excellence</span>
            </h1>
            <p className="text-xl text-zinc-400 max-w-2xl mx-auto mb-10 leading-relaxed">
              From intimate podcast recordings to full-scale music video productions, our spaces are engineered to elevate your creative vision.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Categories */}
      <section className="py-12 px-6 lg:px-8 max-w-7xl mx-auto">
        {serviceCategories.map((category, categoryIndex) => (
          <div key={categoryIndex} className="mb-24 last:mb-12">
            
            {/* Category Header */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">{category.title}</h2>
              <p className="text-lg text-zinc-400 max-w-3xl">{category.description}</p>
              <div className="w-24 h-1 bg-gradient-to-r from-[#d946ef] to-transparent mt-6 rounded-full" />
            </motion.div>

            {/* Services Grid */}
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6"
            >
              {category.services.map((service, serviceIndex) => (
                <motion.div 
                  key={serviceIndex} 
                  variants={itemVariants}
                  className="group relative bg-[#121212] rounded-2xl p-8 border border-zinc-800 hover:border-[#d946ef]/50 transition-all duration-500 overflow-hidden"
                >
                  {/* Subtle hover background glow */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#d946ef]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                  
                  <div className="relative z-10 flex flex-col h-full">
                    <div className="w-14 h-14 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-300 group-hover:text-[#d946ef] group-hover:scale-110 transition-all duration-500 mb-6">
                      {service.icon}
                    </div>
                    
                    <h3 className="text-2xl font-bold text-white mb-3 tracking-tight">{service.title}</h3>
                    <p className="text-zinc-400 leading-relaxed flex-grow">
                      {service.desc}
                    </p>
                    
                    <div className="mt-8 pt-6 border-t border-zinc-800/50">
                      <Link 
                        href="/book" 
                        className="inline-flex items-center text-sm font-semibold text-zinc-300 group-hover:text-white transition-colors"
                      >
                        Book this service 
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        ))}
      </section>

      <CTASection />
    </div>
  );
}
