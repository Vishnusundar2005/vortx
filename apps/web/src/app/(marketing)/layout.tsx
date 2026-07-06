import { Navbar } from '@/components/marketing/Navbar';
import { Footer } from '@/components/marketing/Footer';

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-black text-zinc-100 selection:bg-blue-500/30 font-sans flex flex-col">
      <Navbar />
      <main className="flex-1 w-full pt-[88px] overflow-hidden">
        {children}
      </main>
      <Footer />
    </div>
  );
}
