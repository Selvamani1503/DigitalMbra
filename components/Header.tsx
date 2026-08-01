'use client';

import { useState, useEffect } from 'react';
import { Sun, Moon, Calendar, Menu, X, Sparkles, PhoneCall } from 'lucide-react';

interface HeaderProps {
  onOpenBooking: (serviceName?: string) => void;
  darkMode: boolean;
  setDarkMode: (val: boolean | ((prev: boolean) => boolean)) => void;
}

export default function Header({ onOpenBooking, darkMode, setDarkMode }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#hero' },
    { name: 'About Us', href: '#about' },
    { name: 'Our Services', href: '#services' },
    { name: 'Why Choose Us', href: '#why-us' },
    { name: 'Clinic Gallery', href: '#clinic-gallery' },
    { name: 'Smile Gallery', href: '#smile-gallery' },
    { name: 'Contact Us', href: '#contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'glass-nav py-3.5 shadow-md'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Left: Clinic Logo */}
        <a href="#hero" className="flex items-center gap-3 group">
          <div className="relative w-10 h-10 rounded-xl bg-gradient-to-tr from-dental-blue to-dental-mint p-0.5 shadow-[0_0_15px_rgba(15,157,255,0.4)] group-hover:scale-105 transition-transform duration-300">
            <div className="w-full h-full bg-white dark:bg-dental-darkBg rounded-[10px] flex items-center justify-center">
              <span className="text-xl font-bold gradient-text-blue-mint">🦷</span>
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-poppins font-extrabold tracking-tight text-gray-900 dark:text-white flex items-center gap-1">
              Apex<span className="text-dental-blue">Dent</span>
              <span className="text-[10px] uppercase tracking-wider px-1.5 py-0.5 rounded-full bg-dental-blue/10 text-dental-blue border border-dental-blue/20 font-semibold">
                3D Care
              </span>
            </span>
            <span className="text-[10px] text-gray-500 dark:text-gray-400 font-medium tracking-wide">
              Luxury Dental Clinic
            </span>
          </div>
        </a>

        {/* Center: Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 bg-white/60 dark:bg-dental-darkCard/60 backdrop-blur-md px-4 py-1.5 rounded-full border border-gray-200/50 dark:border-white/10 shadow-sm">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="px-3.5 py-1.5 rounded-full text-xs font-medium text-gray-700 dark:text-gray-300 hover:text-dental-blue dark:hover:text-dental-mint hover:bg-dental-blue/5 dark:hover:bg-white/5 transition-all duration-200"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Right Corner: Theme Toggle & Book Appointment Button */}
        <div className="hidden sm:flex items-center gap-3">
          {/* Dark Mode Toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            aria-label="Toggle Dark Mode"
            className="p-2.5 rounded-xl bg-gray-100 dark:bg-white/10 text-gray-700 dark:text-amber-300 hover:bg-gray-200 dark:hover:bg-white/20 transition-all duration-200"
          >
            {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4 text-gray-700" />}
          </button>

          {/* Quick Call pill */}
          <a
            href="tel:+15550192000"
            className="hidden md:flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-gray-700 dark:text-gray-300 hover:text-dental-blue transition-colors"
          >
            <PhoneCall className="w-3.5 h-3.5 text-dental-mint" />
            <span>(555) 019-2000</span>
          </a>

          {/* Book Appointment CTA Button */}
          <button
            onClick={() => onOpenBooking()}
            className="relative group overflow-hidden rounded-xl bg-gradient-to-r from-dental-blue to-dental-mint p-px font-semibold shadow-glow-blue hover:shadow-[0_0_30px_rgba(15,157,255,0.6)] transition-all duration-300 hover:scale-105 active:scale-95"
          >
            <div className="relative flex items-center gap-2 px-5 py-2.5 rounded-[11px] bg-dental-blue hover:bg-transparent text-white text-sm font-semibold transition-all duration-300">
              <Calendar className="w-4 h-4 text-dental-mint group-hover:rotate-12 transition-transform" />
              <span>Book Appointment</span>
              <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
            </div>
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex sm:hidden items-center gap-2">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-lg bg-gray-100 dark:bg-white/10 text-gray-700 dark:text-amber-300"
          >
            {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg bg-gray-100 dark:bg-white/10 text-gray-700 dark:text-white"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="sm:hidden glass-card mt-3 mx-4 p-5 rounded-2xl border border-dental-blue/20 flex flex-col gap-3 animate-in fade-in slide-in-from-top-4 duration-300 shadow-xl">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="px-4 py-2.5 rounded-xl text-sm font-medium text-gray-800 dark:text-gray-200 hover:bg-dental-blue/10 hover:text-dental-blue transition-colors"
            >
              {link.name}
            </a>
          ))}
          <div className="pt-2 border-t border-gray-200 dark:border-white/10 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-dental-blue to-dental-mint text-white font-semibold flex items-center justify-center gap-2 shadow-lg"
            >
              <Calendar className="w-4 h-4" />
              Book Appointment
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
