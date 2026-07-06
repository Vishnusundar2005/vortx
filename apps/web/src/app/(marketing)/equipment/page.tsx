import { SectionTitle } from '@/components/marketing/SectionTitle';

export default function EquipmentPage() {
  const categories = [
    { 
      name: "Audio", 
      items: ["Shure SM7B Microphones", "RØDECaster Pro II", "Sony MDR-7506 Headphones", "Cloudlifter CL-1"]
    },
    { 
      name: "Cameras", 
      items: ["Sony FX3", "Sony A7S III", "Blackmagic Pocket Cinema Camera 6K", "GoPro Hero 11"]
    },
    { 
      name: "Lighting", 
      items: ["Aputure LS 300d II", "Aputure Amaran 200x", "Nanlite PavoTube II", "Godox AD600Pro Strobes"]
    },
    { 
      name: "Grip & Accessories", 
      items: ["C-Stands with Boom Arms", "Sandbags", "V-Flats", "Gels and Diffusion Paper"]
    }
  ];

  return (
    <div className="pt-24 pb-16 bg-black min-h-screen">
      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        <SectionTitle title="Studio Equipment" subtitle="Industry-standard gear available for your session." />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
          {categories.map((cat, i) => (
            <div key={i} className="bg-zinc-950 p-6 rounded-xl border border-zinc-800">
              <h3 className="text-xl font-bold text-white mb-4 border-b border-zinc-800 pb-3">{cat.name}</h3>
              <ul className="space-y-2">
                {cat.items.map((item, j) => (
                  <li key={j} className="text-zinc-400 flex items-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mr-3"></span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
