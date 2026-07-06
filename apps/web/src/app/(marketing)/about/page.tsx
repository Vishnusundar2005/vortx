import { SectionTitle } from '@/components/marketing/SectionTitle';

export default function AboutPage() {
  return (
    <div className="pt-24 pb-16 bg-black min-h-screen">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        <SectionTitle title="About VORTX Studios" alignment="left" />
        <div className="prose prose-invert prose-lg max-w-none">
          <p className="text-zinc-400">
            VORTX Studios was founded with a single mission: to provide creators in Chennai with a premium, uncompromised space to bring their visions to life. Whether you&apos;re recording a top-charting podcast, shooting a commercial, or capturing stunning photography, our facilities are designed to elevate your production value.
          </p>
          <p className="text-zinc-400 mt-6">
            We believe that environment dictates output. That&apos;s why every inch of our studio is meticulously crafted—from acoustic treatments and state-of-the-art lighting grids to comfortable lounges that keep your crew inspired.
          </p>
          <div className="mt-12 bg-zinc-950 p-8 rounded-2xl border border-zinc-800">
            <h3 className="text-xl font-bold text-white mb-4">Our Vision</h3>
            <p className="text-zinc-400">
              To be the premier destination for digital creation in South India, fostering a community of professional creators and businesses who refuse to compromise on quality.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
