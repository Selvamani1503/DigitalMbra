'use client';

import { useEffect, useState, useRef } from 'react';
import { CheckCircle2, UserCheck, Stethoscope, Sparkles, Award, Shield } from 'lucide-react';

export default function AboutSection() {
  const [inView, setInView] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  // Animated counters state
  const [patientsCount, setPatientsCount] = useState(0);
  const [yearsCount, setYearsCount] = useState(0);
  const [treatmentsCount, setTreatmentsCount] = useState(0);
  const [reviewsCount, setReviewsCount] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!inView) return;

    // Animate Happy Patients (Target 15000)
    let p = 0;
    const pTimer = setInterval(() => {
      p += 300;
      if (p >= 15000) {
        setPatientsCount(15000);
        clearInterval(pTimer);
      } else {
        setPatientsCount(p);
      }
    }, 30);

    // Animate Years (Target 15)
    let y = 0;
    const yTimer = setInterval(() => {
      y += 1;
      if (y >= 15) {
        setYearsCount(15);
        clearInterval(yTimer);
      } else {
        setYearsCount(y);
      }
    }, 80);

    // Animate Treatments (Target 25000)
    let t = 0;
    const tTimer = setInterval(() => {
      t += 500;
      if (t >= 25000) {
        setTreatmentsCount(25000);
        clearInterval(tTimer);
      } else {
        setTreatmentsCount(t);
      }
    }, 30);

    // Animate Reviews (Target 4.9 -> count up 49)
    let r = 0;
    const rTimer = setInterval(() => {
      r += 1;
      if (r >= 49) {
        setReviewsCount(49);
        clearInterval(rTimer);
      } else {
        setReviewsCount(r);
      }
    }, 40);

    return () => {
      clearInterval(pTimer);
      clearInterval(yTimer);
      clearInterval(tTimer);
      clearInterval(rTimer);
    };
  }, [inView]);

  const features = [
    'Experienced Dentists',
    'Modern Equipment',
    'Sterilized Instruments',
    'Friendly Staff',
    'Affordable Treatments',
    'Comfortable Environment',
  ];

  return (
    <section id="about" ref={sectionRef} className="py-20 lg:py-28 relative overflow-hidden">
      {/* Background Soft Glows */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-dental-blue/10 rounded-full blur-[100px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: 3D Illustration & Visual Glass Showcase */}
          <div className="lg:col-span-6 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Outer Card Container */}
              <div className="relative rounded-3xl overflow-hidden glass-card p-4 border border-dental-blue/20 shadow-2xl">
                {/* Clinic Showcase Mock Visual */}
                <div className="relative h-[380px] sm:h-[420px] rounded-2xl overflow-hidden bg-gradient-to-tr from-slate-900 via-dental-darkBlue to-slate-900 flex items-center justify-center">
                  
                  {/* Abstract 3D Floating Dental Room Nodes */}
                  <div className="absolute inset-0 opacity-40 bg-[radial-gradient(#0F9DFF_1px,transparent_1px)] [background-size:16px_16px]" />
                  
                  {/* Central 3D Icon Graphic */}
                  <div className="relative z-10 flex flex-col items-center text-center p-6">
                    <div className="w-24 h-24 rounded-3xl bg-gradient-to-tr from-dental-blue to-dental-mint p-1 shadow-[0_0_40px_rgba(15,157,255,0.6)] animate-pulse mb-4">
                      <div className="w-full h-full bg-slate-900 rounded-[20px] flex items-center justify-center">
                        <span className="text-4xl">🏥</span>
                      </div>
                    </div>
                    <span className="text-xl font-poppins font-bold text-white mb-1">
                      State-Of-The-Art Clinic
                    </span>
                    <span className="text-xs text-dental-mint font-semibold tracking-wider uppercase">
                      3D Imaging & Digital Scanner Suite
                    </span>
                  </div>

                  {/* Overlaid Floating Doctor Card */}
                  <div className="absolute bottom-4 left-4 right-4 glass-card p-4 rounded-xl border border-white/20 flex items-center gap-4 backdrop-blur-md">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-dental-blue to-dental-mint flex items-center justify-center text-white text-xl font-bold">
                      👨‍⚕️
                    </div>
                    <div className="flex flex-col text-left">
                      <span className="text-sm font-bold text-gray-900 dark:text-white">
                        Dr. Alexander Vance, D.D.S.
                      </span>
                      <span className="text-xs text-gray-600 dark:text-gray-300">
                        Lead Dental Surgeon & Implant Specialist
                      </span>
                    </div>
                    <Shield className="w-5 h-5 text-dental-mint ml-auto" />
                  </div>
                </div>

              </div>

              {/* Floating Badge 1 */}
              <div className="absolute -top-6 -right-6 glass-card p-4 rounded-2xl border border-amber-300/40 shadow-xl flex items-center gap-3 animate-float-slow hidden sm:flex">
                <div className="p-2.5 rounded-xl bg-amber-400/20 text-amber-500">
                  <Award className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs font-bold text-gray-900 dark:text-white">Top Rated Clinic</div>
                  <div className="text-[10px] text-gray-500 dark:text-gray-400">Award 2026 Winner</div>
                </div>
              </div>

            </div>
          </div>

          {/* Right Column: Narrative Content & Checklist */}
          <div className="lg:col-span-6 flex flex-col gap-6 text-left">
            
            {/* Section Tag */}
            <div className="inline-flex items-center gap-2 self-start px-3.5 py-1.5 rounded-full bg-dental-blue/10 text-dental-blue dark:text-dental-mint text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>About Our Clinic</span>
            </div>

            {/* Heading */}
            <h2 className="text-3xl sm:text-4xl font-poppins font-extrabold text-gray-900 dark:text-white tracking-tight leading-tight">
              Pioneering Dental Care with <br />
              <span className="gradient-text-blue-mint">Compassion & Precision.</span>
            </h2>

            {/* Paragraph */}
            <p className="text-base text-gray-600 dark:text-gray-300 leading-relaxed font-normal">
              We provide world-class dental treatments using modern technology and experienced professionals. Our mission is to deliver healthy, confident smiles in a comfortable and caring environment.
            </p>

            {/* Checkmarked Features Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 py-2">
              {features.map((item) => (
                <div key={item} className="flex items-center gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-dental-mint/20 text-dental-mint flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 className="w-4 h-4 text-dental-mint" />
                  </div>
                  <span className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                    {item}
                  </span>
                </div>
              ))}
            </div>

            {/* Animated Counters Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-gray-200/60 dark:border-white/10">
              
              {/* Counter 1: Patients */}
              <div className="flex flex-col text-left">
                <span className="text-2xl sm:text-3xl font-poppins font-extrabold text-dental-blue dark:text-dental-mint">
                  {patientsCount.toLocaleString()}+
                </span>
                <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 mt-1">
                  Happy Patients
                </span>
              </div>

              {/* Counter 2: Years */}
              <div className="flex flex-col text-left">
                <span className="text-2xl sm:text-3xl font-poppins font-extrabold text-dental-blue dark:text-dental-mint">
                  {yearsCount}+
                </span>
                <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 mt-1">
                  Years Experience
                </span>
              </div>

              {/* Counter 3: Treatments */}
              <div className="flex flex-col text-left">
                <span className="text-2xl sm:text-3xl font-poppins font-extrabold text-dental-blue dark:text-dental-mint">
                  {treatmentsCount.toLocaleString()}+
                </span>
                <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 mt-1">
                  Successful Cases
                </span>
              </div>

              {/* Counter 4: Rating */}
              <div className="flex flex-col text-left">
                <span className="text-2xl sm:text-3xl font-poppins font-extrabold text-amber-500 flex items-center gap-1">
                  {(reviewsCount / 10).toFixed(1)} <span className="text-sm">★</span>
                </span>
                <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 mt-1">
                  Positive Reviews
                </span>
              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
