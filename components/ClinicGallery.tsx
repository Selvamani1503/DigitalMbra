'use client';

import { useState } from 'react';
import { Sparkles, Maximize2, X, ChevronLeft, ChevronRight } from 'lucide-react';

interface GalleryItem {
  id: number;
  title: string;
  category: 'Reception' | 'Treatment' | 'Equipment' | 'Staff' | 'Exterior';
  image: string;
  desc: string;
}

export default function ClinicGallery() {
  const [activeTab, setActiveTab] = useState<string>('All');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const galleryItems: GalleryItem[] = [
    {
      id: 1,
      title: 'Luxury Reception & Welcome Lounge',
      category: 'Reception',
      image: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1200&q=80',
      desc: 'Warm, modern reception area designed to make your dental visit calm and stress-free.',
    },
    {
      id: 2,
      title: '3D Guided Dental Suite',
      category: 'Treatment',
      image: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=1200&q=80',
      desc: 'State-of-the-art treatment room with ergonomic leather chair and digital intraoral screens.',
    },
    {
      id: 3,
      title: 'CBCT 3D X-Ray Scanner Room',
      category: 'Equipment',
      image: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=1200&q=80',
      desc: 'High-definition 3D cone beam computed tomography scanner for surgical precision.',
    },
    {
      id: 4,
      title: 'Master Dentist Consultation Room',
      category: 'Staff',
      image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80',
      desc: 'Private consultation space where treatment plans and smile makeovers are discussed.',
    },
    {
      id: 5,
      title: 'Deluxe VIP Waiting Lounge',
      category: 'Reception',
      image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80',
      desc: 'Comfortable seating, herbal beverage bar, and quiet atmosphere for patient relaxation.',
    },
    {
      id: 6,
      title: 'Hospital-Grade Sterilization Lab',
      category: 'Equipment',
      image: 'https://images.unsplash.com/photo-1583912267670-6575ad3736f7?auto=format&fit=crop&w=1200&q=80',
      desc: 'Class-B autoclave sterilization protocol ensuring 100% infection-free instruments.',
    },
    {
      id: 7,
      title: 'Lead Dental Specialists Team',
      category: 'Staff',
      image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=1200&q=80',
      desc: 'Our board-certified dentists and compassionate hygienists dedicated to your smile.',
    },
    {
      id: 8,
      title: 'Modern Architectural Exterior',
      category: 'Exterior',
      image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80',
      desc: 'Conveniently located clinic facility with ample private patient parking.',
    },
  ];

  const categories = ['All', 'Reception', 'Treatment', 'Equipment', 'Staff', 'Exterior'];

  const filteredItems = activeTab === 'All' 
    ? galleryItems 
    : galleryItems.filter(item => item.category === activeTab);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
  };

  const prevImage = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex - 1 + filteredItems.length) % filteredItems.length);
    }
  };

  const nextImage = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % filteredItems.length);
    }
  };

  return (
    <section id="clinic-gallery" className="py-20 lg:py-28 relative overflow-hidden bg-slate-50/50 dark:bg-dental-darkBg/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-dental-blue/10 text-dental-blue dark:text-dental-mint text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Virtual Tour</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-poppins font-extrabold text-gray-900 dark:text-white tracking-tight mb-4">
            Our Luxury <span className="gradient-text-blue-mint">Clinic Gallery</span>
          </h2>
          <p className="text-base text-gray-600 dark:text-gray-300">
            Take a visual tour inside ApexDent 3D — designed for ultimate patient comfort, safety, and advanced clinical care.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all duration-300 ${
                activeTab === cat
                  ? 'bg-gradient-to-r from-dental-blue to-dental-mint text-white shadow-glow-blue scale-105'
                  : 'glass-card text-gray-700 dark:text-gray-300 hover:text-dental-blue hover:bg-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Masonry Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredItems.map((item, idx) => (
            <div
              key={item.id}
              onClick={() => openLightbox(idx)}
              className="group relative rounded-3xl overflow-hidden glass-card border border-white/60 dark:border-white/10 cursor-pointer shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-1.5"
            >
              {/* Image Container */}
              <div className="relative h-64 w-full overflow-hidden bg-slate-200 dark:bg-slate-800">
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                />
                
                {/* Dark Hover Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5 text-white">
                  <span className="text-[10px] font-bold text-dental-mint uppercase tracking-wider mb-1">
                    {item.category}
                  </span>
                  <h4 className="text-sm font-poppins font-bold leading-snug">
                    {item.title}
                  </h4>
                  <div className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-dental-blue bg-white/90 px-3 py-1.5 rounded-full self-start">
                    <Maximize2 className="w-3.5 h-3.5" />
                    <span>Enlarge Photo</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Lightbox Popup Modal */}
      {lightboxIndex !== null && (
        <div className="fixed inset-0 z-[200] bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
          {/* Close Button */}
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors z-10"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Left Arrow */}
          <button
            onClick={prevImage}
            className="absolute left-4 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
          >
            <ChevronLeft className="w-8 h-8" />
          </button>

          {/* Right Arrow */}
          <button
            onClick={nextImage}
            className="absolute right-4 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
          >
            <ChevronRight className="w-8 h-8" />
          </button>

          {/* Main Image Container */}
          <div className="max-w-4xl w-full flex flex-col items-center">
            <img
              src={filteredItems[lightboxIndex].image}
              alt={filteredItems[lightboxIndex].title}
              className="max-h-[75vh] w-auto max-w-full rounded-2xl shadow-2xl object-contain animate-in zoom-in-95 duration-200"
            />
            <div className="mt-4 text-center">
              <span className="text-xs font-bold text-dental-mint uppercase tracking-wider">
                {filteredItems[lightboxIndex].category}
              </span>
              <h3 className="text-xl font-poppins font-bold text-white mt-1">
                {filteredItems[lightboxIndex].title}
              </h3>
              <p className="text-xs text-gray-300 max-w-md mt-1">
                {filteredItems[lightboxIndex].desc}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
