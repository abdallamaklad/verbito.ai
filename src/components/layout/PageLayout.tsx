import { Toaster } from '@/components/ui/sonner';
import { useEffect } from 'react';
import { Outlet,useLocation } from 'react-router-dom';
import Footer from './Footer';
import Navbar from './Navbar';

export default function PageLayout() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="min-h-[100dvh] flex flex-col">
      {/* Skip to main content link (Task 12 — accessibility) */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-white focus:text-black focus:rounded focus:shadow-lg"
      >
        Skip to main content
      </a>

      <Navbar />
      <main id="main-content" className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <Toaster position="top-right" richColors />
    </div>
  );
}
