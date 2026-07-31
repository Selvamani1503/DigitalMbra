'use client';

import { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, Sparkles, CheckCircle2, AlertCircle } from 'lucide-react';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.phone || !formData.message) {
      setStatus('error');
      setErrorMessage('Please fill out all required fields.');
      return;
    }

    setStatus('loading');
    setErrorMessage('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setStatus('success');
        setFormData({ name: '', email: '', phone: '', message: '' });
      } else {
        setStatus('error');
        setErrorMessage(data.error || 'Failed to submit inquiry.');
      }
    } catch (err) {
      console.error(err);
      setStatus('error');
      setErrorMessage('Network connection error. Please try again.');
    }
  };

  return (
    <section id="contact" className="py-20 lg:py-28 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-dental-blue/10 text-dental-blue dark:text-dental-mint text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Get In Touch</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-poppins font-extrabold text-gray-900 dark:text-white tracking-tight mb-4">
            Contact Our <span className="gradient-text-blue-mint">Care Team</span>
          </h2>
          <p className="text-base text-gray-600 dark:text-gray-300">
            Have questions about a treatment or need help? Reach out to our friendly clinic team or drop by our facility.
          </p>
        </div>

        {/* Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Side: Map & Clinic Info */}
          <div className="lg:col-span-6 flex flex-col gap-8">
            
            {/* Contact Info Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Address */}
              <div className="glass-card p-5 rounded-2xl border border-white/60 dark:border-white/10 flex items-start gap-4">
                <div className="p-3 rounded-xl bg-dental-blue/10 text-dental-blue flex-shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase text-gray-400 dark:text-gray-500 tracking-wider">
                    Clinic Address
                  </h4>
                  <p className="text-sm font-semibold text-gray-900 dark:text-white mt-1">
                    100 Luxury Health Blvd, Suite 400, Beverly Hills, CA
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className="glass-card p-5 rounded-2xl border border-white/60 dark:border-white/10 flex items-start gap-4">
                <div className="p-3 rounded-xl bg-dental-mint/10 text-dental-mint flex-shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase text-gray-400 dark:text-gray-500 tracking-wider">
                    Phone & WhatsApp
                  </h4>
                  <p className="text-sm font-semibold text-gray-900 dark:text-white mt-1">
                    +1 (555) 019-2000
                  </p>
                </div>
              </div>

              {/* Email */}
              <div className="glass-card p-5 rounded-2xl border border-white/60 dark:border-white/10 flex items-start gap-4">
                <div className="p-3 rounded-xl bg-amber-500/10 text-amber-500 flex-shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase text-gray-400 dark:text-gray-500 tracking-wider">
                    Email Inquiries
                  </h4>
                  <p className="text-sm font-semibold text-gray-900 dark:text-white mt-1">
                    care@apexdent3d.com
                  </p>
                </div>
              </div>

              {/* Working Hours */}
              <div className="glass-card p-5 rounded-2xl border border-white/60 dark:border-white/10 flex items-start gap-4">
                <div className="p-3 rounded-xl bg-purple-500/10 text-purple-500 flex-shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase text-gray-400 dark:text-gray-500 tracking-wider">
                    Working Hours
                  </h4>
                  <div className="text-xs font-semibold text-gray-900 dark:text-white mt-1">
                    <div>Morning: 10:00 AM – 1:00 PM</div>
                    <div>Evening: 4:00 PM – 9:00 PM</div>
                  </div>
                </div>
              </div>

            </div>

            {/* Stylized Google Map Placeholder */}
            <div className="relative rounded-3xl overflow-hidden glass-card h-64 border border-white/60 dark:border-white/10 shadow-lg group">
              <iframe
                title="Clinic Google Map Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d26430.39324126442!2d-118.411737!3d34.0736204!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m3!1s0x80c2bc04d6d147ab%3A0xd6c7c379fd081ed1!2sBeverly%20Hills%2C%20CA!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus"
                width="100%"
                height="100%"
                style={{ border: 0, filter: 'contrast(1.05) saturate(1.1)' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <div className="absolute bottom-3 left-3 bg-white/90 dark:bg-dental-darkBg/90 backdrop-blur-md px-3 py-1.5 rounded-full text-[11px] font-bold text-dental-blue shadow-md pointer-events-none">
                📍 ApexDent 3D Luxury Medical Plaza
              </div>
            </div>

          </div>

          {/* Right Side: Premium Contact Form */}
          <div className="lg:col-span-6">
            <div className="glass-card p-8 sm:p-10 rounded-3xl border border-white/60 dark:border-white/10 shadow-xl relative">
              <h3 className="text-2xl font-poppins font-bold text-gray-900 dark:text-white mb-2">
                Send Us a Message
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-6">
                Fill out the form below and our clinic coordinator will reply within 1 hour.
              </p>

              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                
                {/* Full Name */}
                <div>
                  <label className="block text-xs font-bold uppercase text-gray-700 dark:text-gray-300 tracking-wider mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. Dr. Sarah Connor"
                    required
                    className="w-full px-4 py-3 rounded-xl bg-white/70 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-sm font-medium focus:outline-none focus:border-dental-blue dark:focus:border-dental-mint transition-colors"
                  />
                </div>

                {/* Email & Phone grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase text-gray-700 dark:text-gray-300 tracking-wider mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="sarah@example.com"
                      required
                      className="w-full px-4 py-3 rounded-xl bg-white/70 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-sm font-medium focus:outline-none focus:border-dental-blue dark:focus:border-dental-mint transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase text-gray-700 dark:text-gray-300 tracking-wider mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+1 (555) 000-0000"
                      required
                      className="w-full px-4 py-3 rounded-xl bg-white/70 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-sm font-medium focus:outline-none focus:border-dental-blue dark:focus:border-dental-mint transition-colors"
                    />
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-xs font-bold uppercase text-gray-700 dark:text-gray-300 tracking-wider mb-1">
                    Your Message *
                  </label>
                  <textarea
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="How can we assist your smile today?"
                    required
                    className="w-full px-4 py-3 rounded-xl bg-white/70 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-sm font-medium focus:outline-none focus:border-dental-blue dark:focus:border-dental-mint transition-colors resize-none"
                  />
                </div>

                {/* Error Banner */}
                {status === 'error' && (
                  <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-400 text-xs font-semibold flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                {/* Success Banner */}
                {status === 'success' && (
                  <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-semibold flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                    <span>Thank you! Your message has been sent successfully. We will reply shortly.</span>
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full mt-2 py-3.5 rounded-xl bg-gradient-to-r from-dental-blue to-dental-mint text-white font-semibold text-sm shadow-glow-blue hover:shadow-[0_0_30px_rgba(15,157,255,0.5)] transition-all duration-300 hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2"
                >
                  {status === 'loading' ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Send Message</span>
                    </>
                  )}
                </button>

              </form>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
