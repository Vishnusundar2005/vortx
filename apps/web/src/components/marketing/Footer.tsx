import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-zinc-950 border-t border-zinc-900 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-1">
            <Link href="/" className="text-2xl font-bold text-white mb-4 block">
              VORTX<span className="text-blue-500">.</span>
            </Link>
            <p className="text-zinc-400 text-sm leading-relaxed mb-6">
              Chennai&apos;s premier creative studio space for podcasts, photography, and video production.
            </p>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-4">Studios</h3>
            <ul className="space-y-3 text-sm text-zinc-400">
              <li><Link href="/services" className="hover:text-white transition">Podcast Studio</Link></li>
              <li><Link href="/services" className="hover:text-white transition">Photography Studio</Link></li>
              <li><Link href="/services" className="hover:text-white transition">Video Production</Link></li>
              <li><Link href="/equipment" className="hover:text-white transition">Equipment Rental</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Company</h3>
            <ul className="space-y-3 text-sm text-zinc-400">
              <li><Link href="/about" className="hover:text-white transition">About Us</Link></li>
              <li><Link href="/gallery" className="hover:text-white transition">Gallery</Link></li>
              <li><Link href="/pricing" className="hover:text-white transition">Pricing</Link></li>
              <li><Link href="/faq" className="hover:text-white transition">FAQ</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Legal & Contact</h3>
            <ul className="space-y-3 text-sm text-zinc-400">
              <li><Link href="/contact" className="hover:text-white transition">Contact Us</Link></li>
              <li><Link href="/privacy-policy" className="hover:text-white transition">Privacy Policy</Link></li>
              <li><Link href="/terms-and-conditions" className="hover:text-white transition">Terms & Conditions</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-zinc-900 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-zinc-500">
          <p>&copy; {new Date().getFullYear()} VORTX Studios. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition">Instagram</a>
            <a href="#" className="hover:text-white transition">YouTube</a>
            <a href="#" className="hover:text-white transition">Facebook</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
