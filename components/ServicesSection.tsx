'use client';

import { useState } from 'react';
import { ArrowRight, Sparkles, X, Check, Calendar, ShieldCheck, Clock } from 'lucide-react';

interface ServiceItem {
  id: number;
  title: string;
  icon: string;
  shortDesc: string;
  fullDesc: string;
  duration: string;
  benefits: string[];
}

interface ServicesSectionProps {
  onOpenBooking: (serviceName?: string) => void;
}

export default function ServicesSection({ onOpenBooking }: ServicesSectionProps) {
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);

  const services: ServiceItem[] = [
    {
      id: 1,
      title: 'Teeth Cleanings',
      icon: '🦷',
      shortDesc: 'Professional teeth cleaning for healthier gums and brighter smiles.',
      fullDesc: 'Our ultrasonic prophylaxis teeth cleaning removes deep-seated plaque, stubborn tartar, and surface stains to preserve healthy gums, eliminate bad breath, and leave your teeth sparkling clean.',
      duration: '45 Mins',
      benefits: [
        'Removes stubborn plaque & tartar build-up',
        'Helps prevent gum disease & gingivitis',
        'Leaves teeth noticeably polished & refreshed',
        'Includes fluoride coating protection'
      ]
    },
    {
      id: 2,
      title: 'Dental Fillings',
      icon: '✨',
      shortDesc: 'Restore damaged teeth with natural-looking fillings.',
      fullDesc: 'We utilize tooth-colored composite resin fillings that bond directly to your natural enamel. Seamlessly matching your tooth color for a durable, invisible, and long-lasting restoration.',
      duration: '60 Mins',
      benefits: [
        'Natural tooth-colored composite material',
        'Prevents further cavity decay expansion',
        'Quick single-visit restoration procedure',
        '100% Mercury-free & bio-compatible'
      ]
    },
    {
      id: 3,
      title: 'Root Canal Treatments',
      icon: '🔬',
      shortDesc: 'Pain-free root canal treatment using advanced technology.',
      fullDesc: 'Save infected teeth without discomfort! Using rotary endodontic tech and gentle local anesthesia, we remove infected pulp tissue, sterilize root canals, and seal your tooth to eliminate pain permanently.',
      duration: '75 Mins',
      benefits: [
        '100% Pain-free gentle local anesthesia',
        'Saves natural tooth from extraction',
        'Precision rotary digital canal technology',
        'Instant relief from severe toothaches'
      ]
    },
    {
      id: 4,
      title: 'Tooth Extractions',
      icon: '🛡️',
      shortDesc: 'Safe and comfortable tooth extraction procedures.',
      fullDesc: 'When a tooth is severely damaged or wisdom teeth cause crowding, our experienced oral surgeons perform minimally invasive extractions with gentle care and rapid recovery protocols.',
      duration: '45 - 60 Mins',
      benefits: [
        'Minimally invasive gentle technique',
        'Ideal for crowded or painful wisdom teeth',
        'Accelerated healing & post-care support',
        'Comfortable sedation options available'
      ]
    },
    {
      id: 5,
      title: 'Dental Crowns',
      icon: '👑',
      shortDesc: 'Strong, natural-looking crowns for damaged teeth.',
      fullDesc: 'Custom CAD/CAM ceramic and porcelain crowns engineered to restore the strength, shape, function, and aesthetics of compromised teeth. Built for maximum longevity and perfect bite alignment.',
      duration: '2 Visits / Same-Day Tech',
      benefits: [
        'Premium Zirconia & Porcelain ceramics',
        'Restores 100% bite function & strength',
        'Stain-resistant & natural translucency',
        '10-Year structural guarantee'
      ]
    }
  ];

  return (
    <section id="services" className="py-20 lg:py-28 relative overflow-hidden bg-slate-50/50 dark:bg-dental-darkBg/50">
      {/* Background Orbs */}
      <div className="absolute top-10 right-0 w-96 h-96 bg-dental-blue/10 rounded-full blur-[120px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-dental-blue/10 text-dental-blue dark:text-dental-mint text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Comprehensive Care</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-poppins font-extrabold text-gray-900 dark:text-white tracking-tight mb-4">
            Our Premium <span className="gradient-text-blue-mint">Dental Services</span>
          </h2>
          <p className="text-base text-gray-600 dark:text-gray-300">
            From routine hygiene to advanced restorative procedures, we blend modern digital dentistry with unmatched patient comfort.
          </p>
        </div>

        {/* Services Cards Grid (5 Cards) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <div
              key={service.id}
              className="group relative rounded-3xl glass-card p-8 border border-white/60 dark:border-white/10 hover:border-dental-blue/50 dark:hover:border-dental-mint/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-glass-hover flex flex-col justify-between"
            >
              {/* Top Row: 3D Icon Container */}
              <div>
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-dental-blue/10 to-dental-mint/20 border border-dental-blue/20 flex items-center justify-center text-3xl shadow-sm group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 mb-6">
                  <span>{service.icon}</span>
                </div>

                {/* Service Title */}
                <h3 className="text-xl font-poppins font-bold text-gray-900 dark:text-white mb-2 group-hover:text-dental-blue dark:group-hover:text-dental-mint transition-colors">
                  {service.title}
                </h3>

                {/* Short Description */}
                <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed mb-6 font-normal">
                  {service.shortDesc}
                </p>
              </div>

              {/* Bottom Action Button */}
              <div className="pt-4 border-t border-gray-200/60 dark:border-white/10 flex items-center justify-between">
                <button
                  onClick={() => setSelectedService(service)}
                  className="text-xs font-bold text-dental-blue dark:text-dental-mint hover:underline flex items-center gap-1 group/btn"
                >
                  <span>Learn More</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                </button>

                <button
                  onClick={() => onOpenBooking(service.title)}
                  className="px-3 py-1.5 rounded-xl bg-dental-blue/10 text-dental-blue hover:bg-dental-blue hover:text-white text-xs font-semibold transition-all duration-200"
                >
                  Book Slot
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>

      {/* Learn More Detail Modal */}
      {selectedService && (
        <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="glass-card max-w-lg w-full rounded-3xl p-6 sm:p-8 border border-white/20 shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
            {/* Close Button */}
            <button
              onClick={() => setSelectedService(null)}
              className="absolute top-5 right-5 p-2 rounded-full bg-gray-100 dark:bg-white/10 text-gray-600 dark:text-gray-300 hover:bg-gray-200"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-dental-blue to-dental-mint flex items-center justify-center text-3xl text-white shadow-lg">
                {selectedService.icon}
              </div>
              <div>
                <h3 className="text-2xl font-poppins font-bold text-gray-900 dark:text-white">
                  {selectedService.title}
                </h3>
                <div className="flex items-center gap-2 text-xs font-semibold text-dental-blue dark:text-dental-mint mt-1">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Est. Duration: {selectedService.duration}</span>
                </div>
              </div>
            </div>

            {/* Modal Description */}
            <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
              {selectedService.fullDesc}
            </p>

            {/* Key Benefits List */}
            <div className="mb-6">
              <h4 className="text-xs uppercase font-bold text-gray-400 dark:text-gray-500 tracking-wider mb-3">
                Key Benefits & Features
              </h4>
              <div className="flex flex-col gap-2">
                {selectedService.benefits.map((b, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs font-semibold text-gray-800 dark:text-gray-200">
                    <Check className="w-4 h-4 text-dental-mint flex-shrink-0" />
                    <span>{b}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Modal Footer CTAs */}
            <div className="flex items-center gap-3 pt-4 border-t border-gray-200 dark:border-white/10">
              <button
                onClick={() => {
                  const title = selectedService.title;
                  setSelectedService(null);
                  onOpenBooking(title);
                }}
                className="flex-1 py-3 rounded-xl bg-gradient-to-r from-dental-blue to-dental-mint text-white font-semibold text-sm shadow-md hover:scale-[1.02] transition-transform flex items-center justify-center gap-2"
              >
                <Calendar className="w-4 h-4" />
                <span>Book This Treatment</span>
              </button>
            </div>

          </div>
        </div>
      )}
    </section>
  );
}
