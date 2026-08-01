'use client';

import { Sparkles, Facebook, Instagram, MessageCircle, MapPin, Phone, Mail, Clock } from 'lucide-react';

export default function Footer({ onOpenBooking }: { onOpenBooking: (serviceName?: string) => void }) {
  return (
    <footer className="bg-slate-900 text-white relative overflow-hidden border-t border-white/10 pt-16 pb-12">
      {/* Ambient background glow */}
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-dental-blue/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          
          {/* Col 1: Clinic Brand */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <a href="#hero" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-dental-blue to-dental-mint p-0.5 shadow-md">
                <div className="w-full h-full bg-slate-900 rounded-[10px] flex items-center justify-center">
                  <span className="text-xl">🦷</span>
                </div>
              </div>
              <span className="text-2xl font-poppins font-extrabold text-white tracking-tight">
                Apex<span className="text-dental-blue">Dent</span> <span className="text-xs uppercase tracking-wider px-2 py-0.5 rounded-full bg-dental-blue/20 text-dental-mint font-semibold">3D</span>
              </span>
            </a>

            <p className="text-xs text-gray-400 leading-relaxed max-w-sm">
              Luxury 3D Dental Clinic providing world-class dentistry, porcelain veneers, pain-free root canals, laser whitening, and instant slot bookings.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className="p-2.5 rounded-full bg-white/5 hover:bg-dental-blue text-gray-300 hover:text-white transition-colors"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="p-2.5 rounded-full bg-white/5 hover:bg-dental-mint text-gray-300 hover:text-white transition-colors"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://wa.me/15550192000"
                target="_blank"
                rel="noreferrer"
                aria-label="WhatsApp"
                className="p-2.5 rounded-full bg-white/5 hover:bg-[#25D366] text-gray-300 hover:text-white transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
              <a
                href="#contact"
                aria-label="Google Maps"
                className="p-2.5 rounded-full bg-white/5 hover:bg-amber-400 text-gray-300 hover:text-slate-900 transition-colors"
              >
                <MapPin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h4 className="text-sm font-poppins font-bold text-white uppercase tracking-wider mb-4">
              Quick Links
            </h4>
            <ul className="flex flex-col gap-2.5 text-xs text-gray-400">
              <li>
                <a href="#hero" className="hover:text-dental-mint transition-colors">Home</a>
              </li>
              <li>
                <a href="#about" className="hover:text-dental-mint transition-colors">About Us</a>
              </li>
              <li>
                <a href="#services" className="hover:text-dental-mint transition-colors">Our Services</a>
              </li>
              <li>
                <a href="#why-us" className="hover:text-dental-mint transition-colors">Why Choose Us</a>
              </li>
              <li>
                <a href="#clinic-gallery" className="hover:text-dental-mint transition-colors">Clinic Gallery</a>
              </li>
              <li>
                <a href="#smile-gallery" className="hover:text-dental-mint transition-colors">Smile Gallery</a>
              </li>
              <li>
                <a href="#contact" className="hover:text-dental-mint transition-colors">Contact Us</a>
              </li>
            </ul>
          </div>

          {/* Col 3: Treatments */}
          <div>
            <h4 className="text-sm font-poppins font-bold text-white uppercase tracking-wider mb-4">
              Our Services
            </h4>
            <ul className="flex flex-col gap-2.5 text-xs text-gray-400">
              <li>
                <button onClick={() => onOpenBooking('Teeth Cleanings')} className="hover:text-dental-mint transition-colors text-left">
                  Teeth Cleanings
                </button>
              </li>
              <li>
                <button onClick={() => onOpenBooking('Dental Fillings')} className="hover:text-dental-mint transition-colors text-left">
                  Dental Fillings
                </button>
              </li>
              <li>
                <button onClick={() => onOpenBooking('Root Canal Treatments')} className="hover:text-dental-mint transition-colors text-left">
                  Root Canal Treatment
                </button>
              </li>
              <li>
                <button onClick={() => onOpenBooking('Tooth Extractions')} className="hover:text-dental-mint transition-colors text-left">
                  Tooth Extractions
                </button>
              </li>
              <li>
                <button onClick={() => onOpenBooking('Dental Crowns')} className="hover:text-dental-mint transition-colors text-left">
                  Dental Crowns
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact & Hours */}
          <div>
            <h4 className="text-sm font-poppins font-bold text-white uppercase tracking-wider mb-4">
              Contact Details
            </h4>
            <div className="flex flex-col gap-3 text-xs text-gray-400">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-dental-blue flex-shrink-0 mt-0.5" />
                <span>100 Luxury Health Blvd, Beverly Hills, CA</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-dental-mint flex-shrink-0" />
                <span>+1 (555) 019-2000</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <span>care@apexdent3d.com</span>
              </div>
              <div className="pt-2 border-t border-white/10 flex items-start gap-2">
                <Clock className="w-4 h-4 text-purple-400 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="text-white font-semibold">Working Hours:</div>
                  <div>Morning: 10:00 AM – 1:00 PM</div>
                  <div>Evening: 4:00 PM – 9:00 PM</div>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Copyright Footer Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <p>© 2026 ApexDent 3D Premium Dental Clinic. All Rights Reserved.</p>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-gray-400 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-gray-400 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-gray-400 transition-colors">HIPAA Compliance</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
