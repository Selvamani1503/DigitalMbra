'use client';

import { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { X, Calendar as CalendarIcon, Clock, CheckCircle2, AlertCircle, Download, Sparkles, User, Mail, Phone, Stethoscope, ChevronRight } from 'lucide-react';

interface SlotInfo {
  time: string;
  session: 'Morning' | 'Evening';
  available: boolean;
}

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedService?: string;
}

export default function BookingModal({ isOpen, onClose, preselectedService }: BookingModalProps) {
  const [step, setStep] = useState<1 | 2 | 3>(1);

  // Form Fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [service, setService] = useState(preselectedService || 'Teeth Cleanings');
  
  // Default date to today in YYYY-MM-DD
  const todayStr = new Date().toISOString().split('T')[0];
  const [selectedDate, setSelectedDate] = useState(todayStr);
  const [selectedSlot, setSelectedSlot] = useState('');
  const [message, setMessage] = useState('');

  // API State
  const [slotsLoading, setSlotsLoading] = useState(false);
  const [slots, setSlots] = useState<SlotInfo[]>([]);
  const [availableCount, setAvailableCount] = useState<number>(0);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [confirmedBooking, setConfirmedBooking] = useState<any>(null);

  useEffect(() => {
    if (preselectedService) {
      setService(preselectedService);
    }
  }, [preselectedService]);

  // Fetch slots from backend whenever date changes
  useEffect(() => {
    if (!isOpen || !selectedDate) return;

    const fetchSlots = async () => {
      setSlotsLoading(true);
      setErrorMsg('');
      try {
        const res = await fetch(`/api/appointments/slots?date=${selectedDate}`);
        if (res.ok) {
          const data = await res.json();
          setSlots(data.slots || []);
          setAvailableCount(data.availableSlotsCount || 0);
        } else {
          // Fallback master slots if backend server isn't reached yet
          setFallbackSlots();
        }
      } catch (err) {
        setFallbackSlots();
      } finally {
        setSlotsLoading(false);
      }
    };

    fetchSlots();
  }, [isOpen, selectedDate]);

  const setFallbackSlots = () => {
    const master: SlotInfo[] = [
      { time: '10:00 - 11:00 AM', session: 'Morning', available: true },
      { time: '11:00 - 12:00 PM', session: 'Morning', available: true },
      { time: '12:00 - 1:00 PM', session: 'Morning', available: true },
      { time: '4:00 - 5:00 PM', session: 'Evening', available: true },
      { time: '5:00 - 6:00 PM', session: 'Evening', available: false },
      { time: '6:00 - 7:00 PM', session: 'Evening', available: true },
      { time: '7:00 - 8:00 PM', session: 'Evening', available: true },
      { time: '8:00 - 9:00 PM', session: 'Evening', available: true },
    ];
    setSlots(master);
    setAvailableCount(7);
  };

  const handleNextToSlots = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !phone || !service) {
      setErrorMsg('Please complete all personal details first.');
      return;
    }
    setErrorMsg('');
    setStep(2);
  };

  const handleFinalSubmit = async () => {
    if (!selectedSlot) {
      setErrorMsg('Please select an available time slot.');
      return;
    }

    setSubmitLoading(true);
    setErrorMsg('');

    try {
      const res = await fetch('/api/booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          phone,
          service,
          date: selectedDate,
          slot: selectedSlot,
          message,
        }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setConfirmedBooking(data.appointment);
        setStep(3);
        
        // Fire Confetti Explosion
        confetti({
          particleCount: 120,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#0F9DFF', '#00C9A7', '#38BDF8', '#FFD166'],
        });
      } else {
        setErrorMsg(data.error || 'This slot was just booked by another patient. Please select another slot.');
        // Refresh slots
        fetch(`/api/appointments/slots?date=${selectedDate}`)
          .then(r => r.json())
          .then(d => {
            setSlots(d.slots || []);
            setAvailableCount(d.availableSlotsCount || 0);
          });
      }
    } catch (err) {
      console.error(err);
      setErrorMsg('Error connecting to backend server. Please try again.');
    } finally {
      setSubmitLoading(false);
    }
  };

  // Export .ics Calendar File
  const downloadCalendarFile = () => {
    if (!confirmedBooking) return;
    const icsData = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//ApexDent 3D Luxury Dental Clinic//EN
BEGIN:VEVENT
SUMMARY:ApexDent Dental Appointment - ${confirmedBooking.service}
DESCRIPTION:Confirmed dental appointment for ${confirmedBooking.name} at ApexDent 3D Clinic.\\nTreatment: ${confirmedBooking.service}\\nNotes: ${confirmedBooking.message || 'None'}
LOCATION:100 Luxury Health Blvd, Suite 400, Beverly Hills, CA
DTSTART:${confirmedBooking.date.replace(/-/g, '')}T100000Z
DTEND:${confirmedBooking.date.replace(/-/g, '')}T110000Z
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsData], { type: 'text/calendar;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `ApexDent_Appointment_${confirmedBooking.date}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[250] bg-black/70 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="glass-card max-w-2xl w-full rounded-3xl p-6 sm:p-8 border border-white/40 dark:border-white/10 shadow-2xl relative animate-in fade-in zoom-in-95 duration-200 my-auto">
        
        {/* Close Modal Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2.5 rounded-full bg-gray-100 dark:bg-white/10 text-gray-600 dark:text-gray-300 hover:bg-gray-200 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-dental-blue to-dental-mint p-0.5 shadow-md">
            <div className="w-full h-full bg-white dark:bg-dental-darkBg rounded-[14px] flex items-center justify-center">
              <span className="text-2xl">🦷</span>
            </div>
          </div>
          <div>
            <h3 className="text-xl sm:text-2xl font-poppins font-bold text-gray-900 dark:text-white">
              Book Real-Time Appointment
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Live Slot Engine — 100% Double-Booking Protected
            </p>
          </div>
        </div>

        {/* Step Indicator Pills */}
        <div className="flex items-center gap-2 mb-8">
          <div className={`flex-1 h-1.5 rounded-full ${step >= 1 ? 'bg-dental-blue' : 'bg-gray-200 dark:bg-white/10'}`} />
          <div className={`flex-1 h-1.5 rounded-full ${step >= 2 ? 'bg-dental-blue' : 'bg-gray-200 dark:bg-white/10'}`} />
          <div className={`flex-1 h-1.5 rounded-full ${step >= 3 ? 'bg-dental-mint' : 'bg-gray-200 dark:bg-white/10'}`} />
        </div>

        {/* STEP 1: Personal & Service Details */}
        {step === 1 && (
          <form onSubmit={handleNextToSlots} className="flex flex-col gap-4">
            
            {/* Full Name */}
            <div>
              <label className="block text-xs font-bold uppercase text-gray-700 dark:text-gray-300 tracking-wider mb-1 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-dental-blue" />
                <span>Full Name *</span>
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Jane Doe"
                required
                className="w-full px-4 py-3 rounded-xl bg-white/80 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-sm font-medium focus:outline-none focus:border-dental-blue"
              />
            </div>

            {/* Email & Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase text-gray-700 dark:text-gray-300 tracking-wider mb-1 flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-dental-blue" />
                  <span>Email Address *</span>
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="jane@example.com"
                  required
                  className="w-full px-4 py-3 rounded-xl bg-white/80 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-sm font-medium focus:outline-none focus:border-dental-blue"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-gray-700 dark:text-gray-300 tracking-wider mb-1 flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-dental-blue" />
                  <span>Phone Number *</span>
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+1 (555) 019-2000"
                  required
                  className="w-full px-4 py-3 rounded-xl bg-white/80 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-sm font-medium focus:outline-none focus:border-dental-blue"
                />
              </div>
            </div>

            {/* Select Treatment */}
            <div>
              <label className="block text-xs font-bold uppercase text-gray-700 dark:text-gray-300 tracking-wider mb-1 flex items-center gap-1.5">
                <Stethoscope className="w-3.5 h-3.5 text-dental-mint" />
                <span>Select Treatment *</span>
              </label>
              <select
                value={service}
                onChange={(e) => setService(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-xl bg-white/80 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-sm font-semibold focus:outline-none focus:border-dental-blue text-gray-900 dark:text-white"
              >
                <option value="Teeth Cleanings">🦷 Teeth Cleanings</option>
                <option value="Dental Fillings">🦷 Dental Fillings</option>
                <option value="Root Canal Treatments">🦷 Root Canal Treatments</option>
                <option value="Tooth Extractions">🦷 Tooth Extractions</option>
                <option value="Dental Crowns">🦷 Dental Crowns</option>
              </select>
            </div>

            {errorMsg && (
              <div className="p-3 rounded-xl bg-rose-500/10 text-rose-500 text-xs font-semibold flex items-center gap-2">
                <AlertCircle className="w-4 h-4" />
                <span>{errorMsg}</span>
              </div>
            )}

            <button
              type="submit"
              className="w-full mt-2 py-3.5 rounded-xl bg-gradient-to-r from-dental-blue to-dental-mint text-white font-semibold text-sm shadow-glow-blue flex items-center justify-center gap-2"
            >
              <span>Continue to Date & Live Slots</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </form>
        )}

        {/* STEP 2: Live Date & Time Slot Selection */}
        {step === 2 && (
          <div className="flex flex-col gap-5">
            {/* Preferred Date Picker */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold uppercase text-gray-700 dark:text-gray-300 tracking-wider flex items-center gap-1.5">
                  <CalendarIcon className="w-3.5 h-3.5 text-dental-blue" />
                  <span>Select Preferred Date</span>
                </label>
                <span className="text-xs font-semibold text-dental-mint">
                  {availableCount} Available Slots Today
                </span>
              </div>
              <input
                type="date"
                min={todayStr}
                value={selectedDate}
                onChange={(e) => {
                  setSelectedDate(e.target.value);
                  setSelectedSlot('');
                }}
                className="w-full px-4 py-3 rounded-xl bg-white/80 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-sm font-semibold focus:outline-none focus:border-dental-blue"
              />
            </div>

            {/* Time Slot Selector */}
            <div>
              <label className="block text-xs font-bold uppercase text-gray-700 dark:text-gray-300 tracking-wider mb-3 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-dental-blue" />
                <span>Select 1-Hour Time Slot</span>
              </label>

              {slotsLoading ? (
                <div className="py-8 text-center text-xs text-gray-500 flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-dental-blue border-t-transparent rounded-full animate-spin" />
                  <span>Fetching live slot availability...</span>
                </div>
              ) : (
                <div className="flex flex-col gap-4">
                  {/* Morning Sessions */}
                  <div>
                    <span className="text-[11px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2 block">
                      Morning Session (10:00 AM – 1:00 PM)
                    </span>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                      {slots.filter(s => s.session === 'Morning').map((s) => (
                        <button
                          key={s.time}
                          type="button"
                          disabled={!s.available}
                          onClick={() => setSelectedSlot(s.time)}
                          className={`py-3 px-3 rounded-xl text-xs font-semibold transition-all duration-200 flex flex-col items-center justify-center border ${
                            !s.available
                              ? 'bg-gray-100 dark:bg-white/5 text-gray-400 dark:text-gray-600 border-gray-200 dark:border-white/5 cursor-not-allowed line-through'
                              : selectedSlot === s.time
                              ? 'bg-gradient-to-r from-dental-blue to-dental-mint text-white border-transparent shadow-md scale-105'
                              : 'bg-white/80 dark:bg-white/5 text-gray-800 dark:text-gray-200 border-gray-200 dark:border-white/10 hover:border-dental-blue'
                          }`}
                        >
                          <span>{s.time}</span>
                          <span className="text-[9px] mt-0.5">
                            {s.available ? 'Available' : 'Booked'}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Evening Sessions */}
                  <div>
                    <span className="text-[11px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2 block">
                      Evening Session (4:00 PM – 9:00 PM)
                    </span>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                      {slots.filter(s => s.session === 'Evening').map((s) => (
                        <button
                          key={s.time}
                          type="button"
                          disabled={!s.available}
                          onClick={() => setSelectedSlot(s.time)}
                          className={`py-3 px-3 rounded-xl text-xs font-semibold transition-all duration-200 flex flex-col items-center justify-center border ${
                            !s.available
                              ? 'bg-gray-100 dark:bg-white/5 text-gray-400 dark:text-gray-600 border-gray-200 dark:border-white/5 cursor-not-allowed line-through'
                              : selectedSlot === s.time
                              ? 'bg-gradient-to-r from-dental-blue to-dental-mint text-white border-transparent shadow-md scale-105'
                              : 'bg-white/80 dark:bg-white/5 text-gray-800 dark:text-gray-200 border-gray-200 dark:border-white/10 hover:border-dental-blue'
                          }`}
                        >
                          <span>{s.time}</span>
                          <span className="text-[9px] mt-0.5">
                            {s.available ? 'Available' : 'Booked'}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Optional Notes */}
            <div>
              <label className="block text-xs font-bold uppercase text-gray-700 dark:text-gray-300 tracking-wider mb-1">
                Special Medical Notes (Optional)
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Any tooth sensitivity or special requests?"
                rows={2}
                className="w-full px-4 py-2.5 rounded-xl bg-white/80 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-xs font-medium focus:outline-none focus:border-dental-blue resize-none"
              />
            </div>

            {errorMsg && (
              <div className="p-3 rounded-xl bg-rose-500/10 text-rose-500 text-xs font-semibold flex items-center gap-2">
                <AlertCircle className="w-4 h-4" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Actions */}
            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="px-5 py-3 rounded-xl bg-gray-200 dark:bg-white/10 text-gray-700 dark:text-gray-300 text-xs font-semibold hover:bg-gray-300"
              >
                Back
              </button>

              <button
                type="button"
                disabled={!selectedSlot || submitLoading}
                onClick={handleFinalSubmit}
                className="flex-1 py-3.5 rounded-xl bg-gradient-to-r from-dental-blue to-dental-mint text-white font-semibold text-sm shadow-glow-blue hover:scale-[1.01] active:scale-[0.99] transition-all disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {submitLoading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-amber-300" />
                    <span>Confirm & Book Slot</span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: Confetti Victory Screen */}
        {step === 3 && confirmedBooking && (
          <div className="flex flex-col items-center text-center py-4 animate-in zoom-in-95 duration-300">
            <div className="w-20 h-20 rounded-full bg-dental-mint/20 text-dental-mint flex items-center justify-center mb-4 border-2 border-dental-mint">
              <CheckCircle2 className="w-12 h-12" />
            </div>

            <h4 className="text-2xl font-poppins font-extrabold text-gray-900 dark:text-white mb-2">
              Appointment Confirmed!
            </h4>
            <p className="text-xs text-gray-500 dark:text-gray-400 max-w-md mb-6">
              Thank you, <span className="font-bold text-gray-900 dark:text-white">{confirmedBooking.name}</span>! Your appointment slot has been successfully secured.
            </p>

            {/* Summary Ticket */}
            <div className="w-full bg-slate-100 dark:bg-white/5 p-5 rounded-2xl border border-gray-200 dark:border-white/10 text-left mb-6 flex flex-col gap-2">
              <div className="flex justify-between text-xs">
                <span className="text-gray-500 dark:text-gray-400 font-medium">Booking Reference:</span>
                <span className="font-bold text-dental-blue uppercase">{confirmedBooking.id}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-gray-500 dark:text-gray-400 font-medium">Treatment:</span>
                <span className="font-bold text-gray-900 dark:text-white">{confirmedBooking.service}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-gray-500 dark:text-gray-400 font-medium">Reserved Date:</span>
                <span className="font-bold text-gray-900 dark:text-white">{confirmedBooking.date}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-gray-500 dark:text-gray-400 font-medium">Time Slot:</span>
                <span className="font-bold text-dental-mint">{confirmedBooking.slot}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-3 w-full">
              <button
                onClick={downloadCalendarFile}
                className="w-full sm:flex-1 py-3 rounded-xl bg-dental-blue text-white text-xs font-semibold flex items-center justify-center gap-2 hover:bg-dental-blueHover shadow-md"
              >
                <Download className="w-4 h-4" />
                <span>Export to Google Calendar</span>
              </button>

              <button
                onClick={onClose}
                className="w-full sm:w-auto px-6 py-3 rounded-xl glass-card text-gray-800 dark:text-white text-xs font-semibold hover:bg-gray-200"
              >
                Done
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
