'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { authService } from '../../services/auth.service';
import { QueryProvider } from '@/components/providers/query-provider';
import { Sidebar } from '@/components/admin/Sidebar';
import { TopNav } from '@/components/admin/TopNav';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const isLoginPage = pathname === '/admin/login';
    const hasToken = authService.isAuthenticated();

    if (!hasToken && !isLoginPage) {
      router.push('/admin/login');
    } else if (hasToken && isLoginPage) {
      router.push('/admin/dashboard');
    } else {
      setIsLoading(false);
    }
  }, [pathname, router]);

  // Close sidebar when route changes (mobile navigation)
  useEffect(() => {
    setSidebarOpen(false);
  }, [pathname]);

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center bg-zinc-950 text-white">Loading...</div>;
  }

  // If on login page, render without layout
  if (pathname === '/admin/login') {
    return <QueryProvider>{children}</QueryProvider>;
  }

  // Protected Layout
  return (
    <QueryProvider>
      <div className="flex min-h-screen bg-zinc-900 text-zinc-100 font-sans">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <main className="flex-1 flex flex-col min-w-0">
          <TopNav onMenuClick={() => setSidebarOpen(true)} />
          <div className="p-4 sm:p-8 overflow-y-auto flex-1">
            {children}
          </div>
        </main>
      </div>
    </QueryProvider>
  );
}
