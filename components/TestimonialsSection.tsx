'use client';

import { useState, useEffect } from 'react';
import { Star, Sparkles, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

interface ReviewItem {
  id: number;
  name: string;
  role: string;
  avatar: string;
  rating: number;
  review: string;
  treatment: string;
}

export default function TestimonialsSection() {
  const reviews: ReviewItem[] = [
    {
      id: 1,
      name: 'Eleanor Vance',
      role: 'Verified Patient',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      rating: 5,
      review: 'The 3D scanning tech and pain-free root canal treatment were unbelievable. Dr. Vance was incredibly gentle and the clinic feels like a 5-star luxury hotel lounge!',
      treatment: 'Root Canal & Crown',
    },
    {
      id: 2,
      name: 'Marcus Sterling',
      role: 'Verified Patient',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
      rating: 5,
      review: 'Got 8 porcelain veneers done before my wedding. The digital smile preview matched the final result 100%. Hands down the best dental team in the city!',
      treatment: 'Porcelain Veneers',
    },
    {
      id: 3,
      name: 'Sophia Patel',
      role: 'Verified Patient',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80',
      rating: 5,
      review: 'I used to have severe dental anxiety, but ApexDent changed everything. Their laser teeth cleaning was so soothing, and slot booking took literally 10 seconds.',
      treatment: 'Teeth Cleanings',
    },
    {
      id: 4,
      name: 'David Reynolds',
      role: 'Verified Patient',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
      rating: 5,
      review: 'Extremely professional staff! My dental implant procedure was completely smooth and pain-free. I can eat all my favorite foods again with total confidence.',
      treatment: 'Dental Implant',
    },
    {
      id: 5,
      name: 'Chloe Bennett',
      role: 'Verified Patient',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
      rating: 5,
      review: 'Finished my Invisalign journey in just 6 months. The staff reminded me of appointments via SMS and the clinic cleanliness is hospital-grade perfect.',
      treatment: 'Invisalign Aligners',
    },
    {
      id: 6,
      name: 'Jonathan Hayes',
      role: 'Verified Patient',
      avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=200&q=80',
      rating: 5,
      review: 'Had an acute toothache late in the evening and their emergency care slot saved my day. Warm, caring, transparent pricing with zero pressure.',
      treatment: 'Emergency Care',
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % reviews.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isPaused, reviews.length]);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % reviews.length);
  };

  return (
    <section
      id="testimonials"
      className="py-20 lg:py-28 relative overflow-hidden bg-slate-50/50 dark:bg-dental-darkBg/50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-dental-blue/10 text-dental-blue dark:text-dental-mint text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Patient Feedback</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-poppins font-extrabold text-gray-900 dark:text-white tracking-tight mb-4">
            What Our <span className="gradient-text-blue-mint">Patients Say</span>
          </h2>
          <p className="text-base text-gray-600 dark:text-gray-300">
            Read authentic reviews from patients who experienced our 3D luxury dental care and painless treatments.
          </p>
        </div>

        {/* Carousel Container */}
        <div
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          className="relative max-w-4xl mx-auto"
        >
          {/* Main Review Card */}
          <div className="glass-card p-8 sm:p-12 rounded-3xl border border-white/60 dark:border-white/10 shadow-xl relative min-h-[300px] flex flex-col justify-between">
            
            {/* Top Row: Rating & Quote Icon */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex text-amber-400 gap-1">
                {[...Array(reviews[currentIndex].rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-amber-400" />
                ))}
              </div>
              <Quote className="w-10 h-10 text-dental-blue/20 dark:text-dental-mint/20" />
            </div>

            {/* Review Text */}
            <p className="text-lg sm:text-xl text-gray-800 dark:text-gray-100 font-poppins leading-relaxed italic mb-8">
              "{reviews[currentIndex].review}"
            </p>

            {/* Patient Info Footer */}
            <div className="flex items-center justify-between pt-6 border-t border-gray-200/60 dark:border-white/10 flex-wrap gap-4">
              <div className="flex items-center gap-4">
                <img
                  src={reviews[currentIndex].avatar}
                  alt={reviews[currentIndex].name}
                  className="w-14 h-14 rounded-full object-cover border-2 border-dental-blue shadow-md"
                />
                <div>
                  <h4 className="text-base font-poppins font-bold text-gray-900 dark:text-white">
                    {reviews[currentIndex].name}
                  </h4>
                  <span className="text-xs font-semibold text-dental-blue dark:text-dental-mint">
                    {reviews[currentIndex].role}
                  </span>
                </div>
              </div>

              {/* Treatment Tag */}
              <div className="px-4 py-1.5 rounded-full bg-dental-mint/10 text-dental-mint text-xs font-bold border border-dental-mint/20">
                {reviews[currentIndex].treatment}
              </div>
            </div>

          </div>

          {/* Carousel Arrows */}
          <button
            onClick={prevSlide}
            aria-label="Previous Review"
            className="absolute -left-4 sm:-left-6 top-1/2 -translate-y-1/2 p-3 rounded-full glass-card text-gray-800 dark:text-white hover:bg-dental-blue hover:text-white transition-all duration-200 shadow-lg"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={nextSlide}
            aria-label="Next Review"
            className="absolute -right-4 sm:-right-6 top-1/2 -translate-y-1/2 p-3 rounded-full glass-card text-gray-800 dark:text-white hover:bg-dental-blue hover:text-white transition-all duration-200 shadow-lg"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Dots Indicator */}
          <div className="flex items-center justify-center gap-2 mt-8">
            {reviews.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  currentIndex === idx
                    ? 'w-8 bg-gradient-to-r from-dental-blue to-dental-mint'
                    : 'w-2.5 bg-gray-300 dark:bg-white/20'
                }`}
              />
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
