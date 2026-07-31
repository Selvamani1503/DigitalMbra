'use client';

import { Cpu, Award, DollarSign, Siren, ShieldCheck, HeartHandshake, Sparkles } from 'lucide-react';

export default function WhyChooseUs() {
  const features = [
    {
      icon: Cpu,
      title: 'Advanced Technology',
      desc: '3D intraoral digital scanners, CBCT 3D X-rays, and computer-guided laser dentistry for ultra-precise treatment.',
      gradient: 'from-blue-500 to-cyan-400',
    },
    {
      icon: Award,
      title: 'Certified Dentists',
      desc: 'Our team comprises board-certified specialists with over 15 years of clinical expertise and master accolades.',
      gradient: 'from-emerald-500 to-teal-400',
    },
    {
      icon: DollarSign,
      title: 'Affordable Pricing',
      desc: 'Transparent pricing with no hidden costs. Flexible payment installments and insurance coverage options.',
      gradient: 'from-amber-500 to-orange-400',
    },
    {
      icon: Siren,
      title: 'Emergency Care',
      desc: '24/7 emergency dental triage and same-day priority appointments for acute pain and dental trauma.',
      gradient: 'from-rose-500 to-red-400',
    },
    {
      icon: ShieldCheck,
      title: 'Modern Equipment',
      desc: 'Hospital-grade autoclaves, whisper-quiet drills, and luxury ergonomic chairs for maximum peace of mind.',
      gradient: 'from-indigo-500 to-blue-400',
    },
    {
      icon: HeartHandshake,
      title: 'Personalized Treatment',
      desc: 'Tailored smile makeover roadmaps designed around your unique facial aesthetics, lifestyle, and comfort goals.',
      gradient: 'from-purple-500 to-pink-400',
    },
  ];

  return (
    <section id="why-us" className="py-20 lg:py-28 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-dental-blue/10 text-dental-blue dark:text-dental-mint text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>The ApexDent Advantage</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-poppins font-extrabold text-gray-900 dark:text-white tracking-tight mb-4">
            Why Patients <span className="gradient-text-blue-mint">Choose ApexDent 3D</span>
          </h2>
          <p className="text-base text-gray-600 dark:text-gray-300">
            We redefine dental healthcare by combining clinical mastery with luxury comfort and cutting-edge 3D technology.
          </p>
        </div>

        {/* 6 Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="group relative rounded-3xl glass-card p-8 border border-white/60 dark:border-white/10 hover:border-dental-blue/50 dark:hover:border-dental-mint/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-glass-hover"
              >
                {/* Icon Badge */}
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-tr ${item.gradient} p-0.5 shadow-md group-hover:scale-110 transition-transform duration-300 mb-6`}>
                  <div className="w-full h-full bg-white dark:bg-dental-darkBg rounded-[14px] flex items-center justify-center text-gray-900 dark:text-white">
                    <Icon className="w-7 h-7 text-dental-blue dark:text-dental-mint" />
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-xl font-poppins font-bold text-gray-900 dark:text-white mb-3 group-hover:text-dental-blue dark:group-hover:text-dental-mint transition-colors">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed font-normal">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
