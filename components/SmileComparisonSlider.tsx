'use client';

import { useState, useRef, useCallback } from 'react';
import { Sparkles, MoveHorizontal, CheckCircle2 } from 'lucide-react';

interface SmilePair {
  id: number;
  title: string;
  treatment: string;
  duration: string;
  beforeImg: string;
  afterImg: string;
  details: string;
}

export default function SmileComparisonGallery() {
  const smilePairs: SmilePair[] = [
    {
      id: 1,
      title: 'Laser Teeth Whitening',
      treatment: 'Professional Bleaching & Stain Removal',
      duration: 'Single 60-Minute Session',
      beforeImg: 'https://images.unsplash.com/photo-1571772996211-2f02c9727629?auto=format&fit=crop&w=800&q=80',
      afterImg: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=800&q=80',
      details: 'Lightened teeth by 8 full shades using laser activation tech.',
    },
    {
      id: 2,
      title: 'Invisalign Aligners Alignment',
      treatment: 'Clear Orthodontic Tray System',
      duration: '6 Months Treatment',
      beforeImg: 'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&w=800&q=80',
      afterImg: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=800&q=80',
      details: 'Corrected severe overcrowding and bite misalignment effortlessly.',
    },
    {
      id: 3,
      title: 'Porcelain Veneers Makeover',
      treatment: 'Ultra-Thin Ceramic E-Max Veneers',
      duration: '2 Weeks / 2 Appointments',
      beforeImg: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=800&q=80',
      afterImg: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80',
      details: 'Crafted 8 upper porcelain veneers for Hollywood symmetry.',
    },
    {
      id: 4,
      title: 'Full Dental Implant Restoration',
      treatment: 'Zirconia Implant & Crown Replacement',
      duration: '3 Months Total Recovery',
      beforeImg: 'https://images.unsplash.com/photo-1583912267670-6575ad3736f7?auto=format&fit=crop&w=800&q=80',
      afterImg: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=800&q=80',
      details: 'Replaced missing molar tooth with permanent titanium post.',
    },
    {
      id: 5,
      title: 'Composite Gap Bonding',
      treatment: 'Diastema Closure without Braces',
      duration: '45-Minute Single Visit',
      beforeImg: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=800&q=80',
      afterImg: 'https://images.unsplash.com/photo-1571772996211-2f02c9727629?auto=format&fit=crop&w=800&q=80',
      details: 'Closed central incisor gap seamlessly using matching resin.',
    },
    {
      id: 6,
      title: 'Root Canal & Ceramic Crown',
      treatment: 'Endodontic Therapy + Zirconia Crown',
      duration: '2 Appointments',
      beforeImg: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=800&q=80',
      afterImg: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=800&q=80',
      details: 'Saved severely fractured tooth and restored 100% chew function.',
    },
    {
      id: 7,
      title: 'Gum Re-contouring & Aesthetics',
      treatment: 'Diode Laser Soft Tissue Sculpting',
      duration: '30 Minutes Pain-Free',
      beforeImg: 'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&w=800&q=80',
      afterImg: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=800&q=80',
      details: 'Sculpted gummy smile line to reveal elongated aesthetic teeth.',
    },
    {
      id: 8,
      title: 'Complete Smile Rehabilitation',
      treatment: 'Combined Crowns, Aligners & Whitening',
      duration: '4 Months Custom Plan',
      beforeImg: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80',
      afterImg: 'https://images.unsplash.com/photo-1583912267670-6575ad3736f7?auto=format&fit=crop&w=800&q=80',
      details: 'Transformed worn chipped teeth into a glowing radiant smile.',
    },
  ];

  return (
    <section id="smile-gallery" className="py-20 lg:py-28 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-dental-blue/10 text-dental-blue dark:text-dental-mint text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Smile Transformations</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-poppins font-extrabold text-gray-900 dark:text-white tracking-tight mb-4">
            Before & After <span className="gradient-text-blue-mint">Smile Gallery</span>
          </h2>
          <p className="text-base text-gray-600 dark:text-gray-300">
            Drag the interactive slider handle left or right to reveal real patient smile transformations created at ApexDent 3D.
          </p>
        </div>

        {/* 8 Smile Pair Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {smilePairs.map((pair) => (
            <SmileCard key={pair.id} pair={pair} />
          ))}
        </div>

      </div>
    </section>
  );
}

// Single Interactive Comparison Card Component
function SmileCard({ pair }: { pair: SmilePair }) {
  const [sliderPos, setSliderPos] = useState(50);
  const isDragging = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    let percentage = (x / rect.width) * 100;
    if (percentage < 0) percentage = 0;
    if (percentage > 100) percentage = 100;
    setSliderPos(percentage);
  }, []);

  const handleMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    handleMove(e.clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    handleMove(e.touches[0].clientX);
  };

  return (
    <div className="group relative rounded-3xl glass-card border border-white/60 dark:border-white/10 overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300">
      
      {/* Interactive Image Comparison Container */}
      <div
        ref={containerRef}
        onMouseDown={handleMouseDown}
        onMouseMove={(e) => isDragging.current && handleMove(e.clientX)}
        onMouseUp={() => (isDragging.current = false)}
        onMouseLeave={() => (isDragging.current = false)}
        onTouchMove={handleTouchMove}
        className="relative h-60 w-full select-none cursor-ew-resize overflow-hidden bg-slate-900"
      >
        {/* AFTER Image (Base Layer) */}
        <img
          src={pair.afterImg}
          alt={`After ${pair.title}`}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-dental-mint text-white text-[10px] font-bold uppercase tracking-wide shadow-md z-10">
          After
        </span>

        {/* BEFORE Image (Clipped Overlay Layer) */}
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ width: `${sliderPos}%` }}
        >
          <img
            src={pair.beforeImg}
            alt={`Before ${pair.title}`}
            className="absolute inset-0 w-full h-full object-cover max-w-none"
            style={{ width: containerRef.current ? containerRef.current.clientWidth : '100%' }}
          />
          <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-gray-800/80 text-white text-[10px] font-bold uppercase tracking-wide shadow-md z-10">
            Before
          </span>
        </div>

        {/* Split Divider Handle Bar */}
        <div
          className="absolute top-0 bottom-0 w-0.5 bg-white shadow-[0_0_10px_rgba(0,0,0,0.5)] z-20 flex items-center justify-center pointer-events-none"
          style={{ left: `${sliderPos}%` }}
        >
          <div className="w-8 h-8 rounded-full bg-white text-dental-blue shadow-lg flex items-center justify-center -ml-4 border-2 border-dental-blue">
            <MoveHorizontal className="w-4 h-4" />
          </div>
        </div>
      </div>

      {/* Card Info */}
      <div className="p-5 flex flex-col gap-2">
        <span className="text-[11px] font-semibold text-dental-blue dark:text-dental-mint">
          {pair.duration}
        </span>
        <h4 className="text-base font-poppins font-bold text-gray-900 dark:text-white">
          {pair.title}
        </h4>
        <p className="text-xs text-gray-500 dark:text-gray-400">
          {pair.details}
        </p>
      </div>

    </div>
  );
}
