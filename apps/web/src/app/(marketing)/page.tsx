import { Hero } from '@/components/marketing/Hero';
import { AboutSection } from '@/components/marketing/AboutSection';
import { ServiceCard } from '@/components/marketing/ServiceCard';
import { StudioSpacesSection } from '@/components/marketing/StudioSpacesSection';
import { TheStudioSection } from '@/components/marketing/TheStudioSection';
import { PricingSection } from '@/components/marketing/PricingSection';
import { CTASection } from '@/components/marketing/CTASection';
import { Mic, Video, Radio, Scissors, Music, Handshake, Smartphone, Image as ImageIcon } from 'lucide-react';

export default function HomePage() {
  const services = [
    {
      title: "Audio Podcast Recording",
      description: "Crystal-clear audio with professional microphones, soundproofed environment, and studio-grade acoustic treatment.",
      icon: <Mic size={24} />
    },
    {
      title: "Video Podcast Production",
      description: "Single and multi-camera setups with Sony A7 M3, professional lighting rigs, and director-level production support.",
      icon: <Video size={24} />
    },
    {
      title: "Live Streaming",
      description: "Stream directly to YouTube, Instagram, or any platform with our studio's streaming-ready setup and stable connectivity.",
      icon: <Radio size={24} />
    },
    {
      title: "Podcast Editing & Reels",
      description: "Post-production editing, colour grading, audiograms, highlight reels and social media cut-downs included as add-ons.",
      icon: <Scissors size={24} />
    },
    {
      title: "Music & Dance Videos",
      description: "Full studio setup with green screen, dynamic lighting, and generous floor space for music and performance productions.",
      icon: <Music size={24} />
    },
    {
      title: "Community Meetings",
      description: "Ideal for brand launches, corporate sessions, panel discussions, and community gatherings with up to 20 attendees.",
      icon: <Handshake size={24} />
    },
    {
      title: "Social Media Content",
      description: "Short-form content production optimised for Instagram Reels, YouTube Shorts, and other vertical video platforms.",
      icon: <Smartphone size={24} />
    },
    {
      title: "Green Screen Studio",
      description: "Full green screen backdrop with professional lighting kit — opens unlimited creative possibilities for virtual backgrounds.",
      icon: <ImageIcon size={24} />
    }
  ];

  return (
    <>
      <Hero />
      <AboutSection />
      
      <section className="py-24 bg-black">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          
          <div className="mb-16 max-w-3xl">
            <div className="mb-8">
              <span className="inline-block border border-[#d946ef] text-[#d946ef] px-3 py-1 text-xs font-bold tracking-widest uppercase rounded-sm">
                What We Offer
              </span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-6">
              Every Format.<br />Every Creator.
            </h2>
            
            <div className="w-12 h-[2px] bg-[#d946ef] mb-6" />
            
            <p className="text-sm md:text-base text-zinc-400 leading-relaxed max-w-xl">
              From solo audio recordings to full multi-camera video productions — and everything in between.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {services.map((service, index) => (
              <ServiceCard 
                key={index}
                title={service.title}
                description={service.description}
                icon={service.icon}
                delay={index * 0.05}
              />
            ))}
          </div>
        </div>
      </section>

      <StudioSpacesSection />
      
      <TheStudioSection />

      <PricingSection />

      <CTASection />
    </>
  );
}
