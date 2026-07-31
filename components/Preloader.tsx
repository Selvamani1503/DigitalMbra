'use client';

import { useEffect, useState } from 'react';
import { Sparkles } from 'lucide-react';

export default function Preloader() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => setLoading(false), 300);
          return 100;
        }
        return prev + 5;
      });
    }, 40);

    return () => clearInterval(timer);
  }, []);

  if (!loading) return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-[#F8FCFF] dark:bg-[#080E1A] flex flex-col items-center justify-center transition-opacity duration-500">
      <div className="relative flex flex-col items-center">
        {/* Animated 3D Tooth Logo Ring */}
        <div className="relative w-24 h-24 mb-6 flex items-center justify-center">
          <div className="absolute inset-0 rounded-full border-4 border-dental-blue/20 border-t-dental-blue border-r-dental-mint animate-spin" />
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-dental-blue to-dental-mint p-0.5 shadow-[0_0_30px_rgba(15,157,255,0.5)] animate-pulse">
            <div className="w-full h-full bg-white dark:bg-dental-darkBg rounded-[14px] flex items-center justify-center">
              <span className="text-3xl animate-bounce">🦷</span>
            </div>
          </div>
        </div>

        {/* Brand Name & Tagline */}
        <h1 className="text-2xl font-poppins font-extrabold text-gray-900 dark:text-white tracking-tight flex items-center gap-2 mb-1">
          Apex<span className="text-dental-blue">Dent</span>
          <Sparkles className="w-4 h-4 text-dental-mint animate-pulse" />
        </h1>
        <p className="text-xs text-gray-500 dark:text-gray-400 tracking-wider uppercase font-semibold mb-6">
          Premium 3D Dental Clinic
        </p>

        {/* Progress Bar */}
        <div className="w-48 h-1.5 bg-gray-200 dark:bg-white/10 rounded-full overflow-hidden mb-2">
          <div
            className="h-full bg-gradient-to-r from-dental-blue to-dental-mint transition-all duration-150 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        <span className="text-xs font-semibold text-dental-blue dark:text-dental-mint">
          {progress}%
        </span>
      </div>
    </div>
  );
}
