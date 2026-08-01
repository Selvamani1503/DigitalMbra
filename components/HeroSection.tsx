'use client';

import ThreeDToothCanvas from './3DToothCanvas';
import { Calendar, ArrowRight, ShieldCheck, Star, Sparkles, Award, HeartPulse } from 'lucide-react';

interface HeroSectionProps {
  onOpenBooking: (serviceName?: string) => void;
}

export default function HeroSection({ onOpenBooking }: HeroSectionProps) {
  return (
    <section id="hero" className="relative pt-28 pb-16 lg:pt-36 lg:pb-24 overflow-hidden">
      {/* Dynamic Ambient Background Elements */}
      <div className="absolute top-20 left-10 w-96 h-96 bg-dental-blue/15 rounded-full blur-[120px] pointer-events-none -z-10 animate-pulse" />
      <div className="absolute top-40 right-10 w-96 h-96 bg-dental-mint/15 rounded-full blur-[120px] pointer-events-none -z-10 animate-pulse" />

      {/* Background Animated Floating Circles */}
      <div className="absolute top-1/4 left-1/3 w-6 h-6 rounded-full bg-dental-blue/20 animate-float-slow pointer-events-none" />
      <div className="absolute bottom-1/3 left-10 w-8 h-8 rounded-full bg-dental-mint/30 animate-float-medium pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 w-4 h-4 rounded-full bg-amber-400/30 animate-ping pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Side: Copywriting & CTAs */}
          <div className="lg:col-span-7 flex flex-col gap-6 text-center lg:text-left">
            
            {/* Top Badge */}
            <div className="inline-flex items-center gap-2 self-center lg:self-start px-4 py-2 rounded-full glass-card border border-dental-blue/30 text-xs font-semibold text-dental-blue dark:text-dental-mint shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-spin" />
              <span>Next-Gen 3D Animated Dental Excellence</span>
              <span className="w-2 h-2 rounded-full bg-dental-mint animate-ping" />
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-poppins font-extrabold text-gray-900 dark:text-white tracking-tight leading-[1.15]">
              Your Perfect Smile <br className="hidden sm:inline" />
              <span className="gradient-text-blue-mint">Starts Right Here.</span>
            </h1>

            {/* Subheading */}
            <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-2xl font-normal leading-relaxed">
              Advanced Dental Care with Modern 3D Technology, Experienced Specialists, and Pain-Free Comfortable Treatments for the Entire Family.
            </p>

            {/* CTA Group */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              {/* Primary CTA */}
              <button
                onClick={() => onOpenBooking()}
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-dental-blue to-dental-mint text-white font-semibold text-base shadow-glow-blue hover:shadow-[0_0_35px_rgba(15,157,255,0.6)] hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center gap-2 group"
              >
                <Calendar className="w-5 h-5 text-amber-300 group-hover:rotate-12 transition-transform" />
                <span>Book Appointment</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              {/* Secondary CTA */}
              <a
                href="#services"
                className="w-full sm:w-auto px-7 py-4 rounded-2xl glass-card text-gray-800 dark:text-gray-100 font-semibold text-base border border-gray-200/80 dark:border-white/10 hover:border-dental-blue/40 hover:text-dental-blue dark:hover:text-dental-mint hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
              >
                <span>View Services</span>
              </a>
            </div>

            {/* Social Trust Metrics & Ratings */}
            <div className="pt-6 border-t border-gray-200/60 dark:border-white/10 flex flex-wrap items-center justify-center lg:justify-start gap-6">
              {/* Star Rating Badge */}
              <div className="flex items-center gap-3 glass-card px-4 py-2.5 rounded-2xl border border-amber-300/30">
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-sm font-bold text-gray-900 dark:text-white">4.9 / 5.0</span>
                  <span className="text-[11px] text-gray-500 dark:text-gray-400">2,500+ Patient Reviews</span>
                </div>
              </div>

              {/* Security/Sterilized Badge */}
              <div className="flex items-center gap-2 text-xs font-medium text-gray-600 dark:text-gray-300">
                <ShieldCheck className="w-4 h-4 text-dental-mint" />
                <span>100% Hospital-Grade Sterilization</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-medium text-gray-600 dark:text-gray-300">
                <Award className="w-4 h-4 text-dental-blue" />
                <span>Board-Certified Specialists</span>
              </div>
            </div>

          </div>

          {/* Right Side: Interactive 3D Canvas & Floating Badges */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            
            {/* 3D WebGL Canvas */}
            <ThreeDToothCanvas />

            {/* Floating Glass Badges around 3D Canvas */}
            <div className="absolute top-10 left-2 glass-card px-4 py-2.5 rounded-2xl border border-white/50 dark:border-white/10 shadow-3d-card flex items-center gap-3 animate-float-slow">
              <div className="p-2 rounded-xl bg-dental-blue/10 text-dental-blue">
                <HeartPulse className="w-5 h-5" />
              </div>
              <div className="flex flex-col text-left">
                <span className="text-xs font-bold text-gray-900 dark:text-white">Pain-Free Tech</span>
                <span className="text-[10px] text-gray-500 dark:text-gray-400">Laser Guided</span>
              </div>
            </div>

            <div className="absolute bottom-12 right-2 glass-card px-4 py-2.5 rounded-2xl border border-white/50 dark:border-white/10 shadow-3d-card flex items-center gap-3 animate-float-medium">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-dental-blue to-dental-mint flex items-center justify-center text-white text-xs font-bold shadow-md">
                15+
              </div>
              <div className="flex flex-col text-left">
                <span className="text-xs font-bold text-gray-900 dark:text-white">Years Experience</span>
                <span className="text-[10px] text-gray-500 dark:text-gray-400">Master Dentists</span>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
