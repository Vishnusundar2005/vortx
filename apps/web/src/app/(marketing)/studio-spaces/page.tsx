import { SectionTitle } from '@/components/marketing/SectionTitle';
import Image from 'next/image';

export default function StudioSpacesPage() {
  const spaces = [
    { 
      title: "Podcast Studio A", 
      desc: "Intimate, acoustically treated room for up to 4 guests. Equipped with Shure SM7B microphones.",
      image: "/images/DSC02973.JPG"
    },
    { 
      title: "Podcast Studio B", 
      desc: "Larger setup with a conversational seating arrangement, perfect for video podcasts.",
      image: "/images/DSC02984.JPG"
    },
    { 
      title: "The Infinity Cyc", 
      desc: "Large white cyclorama wall for seamless photography and videography.",
      image: "/images/DSC03041.JPG"
    },
    { 
      title: "The Blackout Room", 
      desc: "Completely light-controlled environment for moody, dramatic lighting setups.",
      image: "/images/DSC03076.JPG"
    }
  ];

  return (
    <div className="pt-24 pb-16 bg-black min-h-screen">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <SectionTitle title="Our Studio Spaces" subtitle="Purpose-built environments for every type of production." />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
          {spaces.map((space, i) => (
            <div key={i} className="bg-[#121212] p-6 md:p-8 rounded-2xl border border-zinc-800 transition-colors hover:border-zinc-700">
              <div className="relative aspect-video rounded-lg mb-6 overflow-hidden bg-zinc-900">
                <Image
                  src={space.image}
                  alt={space.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">{space.title}</h3>
              <p className="text-zinc-400 leading-relaxed">{space.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
