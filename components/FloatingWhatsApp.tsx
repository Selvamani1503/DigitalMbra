'use client';

import { useEffect, useState } from 'react';
import { MessageCircle, ArrowUp } from 'lucide-react';

export default function FloatingWidgets({ onOpenBooking }: { onOpenBooking: (serviceName?: string) => void }) {
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 items-end">
      {/* WhatsApp Button */}
      <a
        href="https://wa.me/15550192000?text=Hello%20ApexDent%20Clinic,%20I%20would%20like%20to%20inquire%20about%20dental%20treatments."
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="group flex items-center gap-2 bg-[#25D366] hover:bg-[#20ba59] text-white p-3.5 rounded-full shadow-lg hover:shadow-2xl hover:scale-110 transition-all duration-300 relative"
      >
        <MessageCircle className="w-6 h-6 animate-pulse" />
        <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-500 text-sm font-semibold pr-1">
          Chat with Us
        </span>
        <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-red-500 rounded-full border-2 border-white animate-ping" />
        <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-red-500 rounded-full border-2 border-white" />
      </a>

      {/* Back to top button */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          aria-label="Back to Top"
          className="p-3 bg-white/90 dark:bg-dental-darkCard/90 text-dental-blue hover:text-white hover:bg-dental-blue rounded-full shadow-md hover:shadow-xl border border-dental-blue/20 hover:scale-110 transition-all duration-300 backdrop-blur-md"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}
    </div>
  );
}
