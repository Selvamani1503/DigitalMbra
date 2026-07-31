'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import ServicesSection from '@/components/ServicesSection';
import WhyChooseUs from '@/components/WhyChooseUs';
import ClinicGallery from '@/components/ClinicGallery';
import SmileComparisonGallery from '@/components/SmileComparisonSlider';
import TestimonialsSection from '@/components/TestimonialsSection';
import ContactSection from '@/components/ContactSection';
import BookingModal from '@/components/BookingModal';
import FloatingWidgets from '@/components/FloatingWhatsApp';
import Footer from '@/components/Footer';

export default function Home() {
  const [darkMode, setDarkMode] = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<string | undefined>(undefined);

  // Sync dark mode class on <html> element
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const handleOpenBooking = (serviceName?: string) => {
    setSelectedService(serviceName);
    setBookingOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#F8FCFF] dark:bg-[#080E1A] text-gray-900 dark:text-gray-100 transition-colors duration-300 relative overflow-x-hidden">
      
      {/* Navigation Header */}
      <Header
        onOpenBooking={() => handleOpenBooking()}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />

      {/* Main Content Sections */}
      <main>
        <HeroSection onOpenBooking={() => handleOpenBooking()} />
        <AboutSection />
        <ServicesSection onOpenBooking={(s) => handleOpenBooking(s)} />
        <WhyChooseUs />
        <ClinicGallery />
        <SmileComparisonGallery />
        <TestimonialsSection />
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer onOpenBooking={(s) => handleOpenBooking(s)} />

      {/* Interactive Appointment Modal */}
      <BookingModal
        isOpen={bookingOpen}
        onClose={() => setBookingOpen(false)}
        preselectedService={selectedService}
      />

      {/* Floating WhatsApp Chat & Back to Top Widgets */}
      <FloatingWidgets onOpenBooking={() => handleOpenBooking()} />
    </div>
  );
}
