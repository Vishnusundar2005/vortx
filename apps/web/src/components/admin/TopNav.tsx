'use client';

import { usePathname } from 'next/navigation';
import { Menu } from 'lucide-react';

interface TopNavProps {
  onMenuClick: () => void;
}

const pageTitles: Record<string, string> = {
  dashboard: 'Dashboard',
  bookings: 'Bookings',
  calendar: 'Calendar',
  reports: 'Reports',
  availability: 'Availability Management',
  settings: 'Business Settings',
};

export function TopNav({ onMenuClick }: TopNavProps) {
  const pathname = usePathname();
  const pathParts = pathname.split('/').filter(Boolean);
  const currentPath = pathParts[pathParts.length - 1];
  const title = pageTitles[currentPath] || (currentPath ? currentPath.charAt(0).toUpperCase() + currentPath.slice(1) : 'Admin');

  return (
    <header className="h-16 bg-zinc-950 border-b border-zinc-800 flex items-center px-4 sm:px-8 sticky top-0 z-30">
      {/* Hamburger button - mobile only */}
      <button
        onClick={onMenuClick}
        className="md:hidden mr-4 p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
        aria-label="Open menu"
      >
        <Menu size={22} />
      </button>

      <h2 className="text-lg font-semibold text-white">{title}</h2>
    </header>
  );
}
