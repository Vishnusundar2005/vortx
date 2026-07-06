import Link from 'next/link';
import { Navbar } from '@/components/marketing/Navbar';
import { Footer } from '@/components/marketing/Footer';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-black text-zinc-100 flex flex-col font-sans">
      <Navbar />
      <main className="flex-1 flex flex-col items-center justify-center text-center px-6 pt-[88px]">
        <h1 className="text-8xl font-black text-zinc-800 mb-4 tracking-tighter">404</h1>
        <h2 className="text-3xl font-bold text-white mb-6">Page Not Found</h2>
        <p className="text-zinc-400 max-w-md mx-auto mb-10">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        <Link 
          href="/" 
          className="bg-white text-black hover:bg-zinc-200 px-8 py-3 rounded-full font-bold transition duration-300"
        >
          Return Home
        </Link>
      </main>
      <Footer />
    </div>
  );
}
