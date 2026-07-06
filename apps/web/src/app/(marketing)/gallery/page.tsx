import { SectionTitle } from '@/components/marketing/SectionTitle';
import { CTASection } from '@/components/marketing/CTASection';

export default function GalleryPage() {
  return (
    <div className="bg-black min-h-screen">
      <div className="pt-24 pb-16 max-w-7xl mx-auto px-6 lg:px-8">
        <SectionTitle title="Studio Gallery" subtitle="Take a look inside our premium spaces." />
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-12">
          {/* Placeholders for masonry/grid gallery */}
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="aspect-square bg-zinc-900 rounded-lg flex items-center justify-center text-zinc-700 border border-zinc-800">
              [Image {i}]
            </div>
          ))}
        </div>
      </div>
      <CTASection />
    </div>
  );
}
