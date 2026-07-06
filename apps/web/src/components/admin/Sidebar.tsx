'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { authService } from '@/services/auth.service';
import { LayoutDashboard, Calendar, Clock, Settings, LogOut, Ticket, BarChart2, X } from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const links = [
  { name: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
  { name: 'Bookings', href: '/admin/bookings', icon: Ticket },
  { name: 'Calendar', href: '/admin/calendar', icon: Calendar },
  { name: 'Reports', href: '/admin/reports', icon: BarChart2 },
  { name: 'Availability', href: '/admin/availability', icon: Clock },
  { name: 'Settings', href: '/admin/settings', icon: Settings },
];

function SidebarContent({ onClose }: { onClose: () => void }) {
  const pathname = usePathname();

  return (
    <div className="flex flex-col justify-between h-full p-6">
      <div>
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-white">
            VORTX<span className="text-[#d946ef]">.</span>
          </h1>
          {/* Close button - only visible on mobile */}
          <button
            onClick={onClose}
            className="md:hidden p-1 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
          >
            <X size={20} />
          </button>
        </div>
        <nav className="space-y-1">
          {links.map((link) => {
            const Icon = link.icon;
            const isActive = pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={onClose}
                className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                  isActive
                    ? 'bg-[#d946ef]/10 text-[#d946ef] border border-[#d946ef]/20'
                    : 'text-zinc-400 hover:bg-zinc-800/60 hover:text-white'
                }`}
              >
                <Icon size={20} />
                <span className="font-medium">{link.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      <button
        onClick={() => authService.logout()}
        className="flex items-center space-x-3 px-4 py-3 rounded-xl text-zinc-400 hover:bg-red-500/10 hover:text-red-400 transition-all duration-200"
      >
        <LogOut size={20} />
        <span className="font-medium">Logout</span>
      </button>
    </div>
  );
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex w-64 bg-zinc-950 border-r border-zinc-800 flex-col h-screen sticky top-0 shrink-0">
        <SidebarContent onClose={onClose} />
      </aside>

      {/* Mobile Backdrop Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
          onClick={onClose}
        />
      )}

      {/* Mobile Drawer */}
      <aside
        className={`fixed top-0 left-0 h-full w-72 bg-zinc-950 border-r border-zinc-800 z-50 md:hidden transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <SidebarContent onClose={onClose} />
      </aside>
    </>
  );
}
