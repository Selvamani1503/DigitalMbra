'use client';

import { useEffect, useState } from 'react';
import { MessageCircle, ArrowUp } from 'lucide-react';

interface FloatingWidgetsProps {
  onOpenBooking: () => void;
}

export default function FloatingWidgets({ onOpenBooking }: FloatingWidgetsProps) {
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const whatsappNumber = '15550192000';
  const whatsappMessage = encodeURIComponent('Hello ApexDent 3D Clinic! I would like to inquire about dental appointments.');

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3.5 items-end">
      
      {/* Back to Top Button */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          aria-label="Back to Top"
          className="p-3.5 rounded-full glass-card text-gray-800 dark:text-white border border-white/60 dark:border-white/10 shadow-xl hover:bg-dental-blue hover:text-white hover:border-transparent transition-all duration-300 animate-in fade-in zoom-in-75 duration-200"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}

      {/* Floating WhatsApp Live Chat Button */}
      <a
        href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="group relative flex items-center justify-center p-4 rounded-full bg-[#25D366] text-white shadow-[0_0_25px_rgba(37,211,102,0.5)] hover:shadow-[0_0_35px_rgba(37,211,102,0.8)] hover:scale-110 transition-all duration-300"
      >
        <MessageCircle className="w-6 h-6 fill-current" />
        
        {/* Tooltip on hover */}
        <span className="absolute right-16 bg-slate-900 text-white text-xs font-semibold px-3 py-1.5 rounded-xl whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none shadow-lg border border-white/10">
          Chat with Clinic Desk
        </span>
      </a>

    </div>
  );
}
