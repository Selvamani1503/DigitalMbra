/**
 * Selvamani - Premium Portfolio Website JavaScript
 * Handles: theme switching, header scroll, mobile nav, active links, scroll reveals,
 * statistics counters, skill bars animation, portfolio filters, FAQ accordion,
 * contact form submission, and consultation booking modal with Google Calendar template.
 */

document.addEventListener('DOMContentLoaded', () => {

  // ============================================
  // ⚙️ CONFIGURATION
  // ============================================
  const BUSINESS_EMAIL = 'selvamax967@gmail.com';
  const BUSINESS_NAME = 'Selvamani Marketing Specialist';
  const CONSULTATION_DURATION = 60; // minutes

  // ===== THEME TOGGLE (LIGHT / DARK) =====
  const themeToggle = document.getElementById('themeToggle');
  
  // Check local storage for preference, fallback to light mode
  const currentTheme = localStorage.getItem('theme') || 'light';
  if (currentTheme === 'dark') {
    document.body.classList.add('dark-theme');
  } else {
    document.body.classList.remove('dark-theme');
  }

  themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');
    const theme = document.body.classList.contains('dark-theme') ? 'dark' : 'light';
    localStorage.setItem('theme', theme);
  });

  // ===== HEADER SCROLL EFFECT =====
  const header = document.getElementById('header');

  const handleHeaderScroll = () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleHeaderScroll, { passive: true });
  handleHeaderScroll(); // Run once in case user loads page scrolled down

  // ===== MOBILE NAVIGATION =====
  const hamburger = document.getElementById('hamburger');
  const mainNav = document.getElementById('mainNav');
  const dropdownWrapper = document.querySelector('.nav-dropdown-wrapper');
  const navServices = document.getElementById('nav-services');

  // Helper to close mobile menu
  const closeMobileNav = () => {
    if (hamburger) hamburger.classList.remove('active');
    if (mainNav) mainNav.classList.remove('mobile-open');
    document.body.style.overflow = '';
    if (dropdownWrapper) dropdownWrapper.classList.remove('active');
  };

  // Helper smooth scroll to element ID
  const scrollToTarget = (targetId) => {
    const targetEl = document.getElementById(targetId);
    if (targetEl) {
      const headerEl = document.getElementById('header');
      const headerHeight = headerEl ? headerEl.offsetHeight : 70;
      const targetPos = targetEl.getBoundingClientRect().top + window.scrollY - headerHeight - 20;
      window.scrollTo({
        top: Math.max(0, targetPos),
        behavior: 'smooth'
      });
    }
  };

  if (hamburger && mainNav) {
    hamburger.addEventListener('click', (e) => {
      e.stopPropagation();
      hamburger.classList.toggle('active');
      mainNav.classList.toggle('mobile-open');
      document.body.style.overflow = mainNav.classList.contains('mobile-open') ? 'hidden' : '';
    });
  }

  // Toggle dropdown on click (both desktop and mobile)
  if (navServices && dropdownWrapper) {
    navServices.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      dropdownWrapper.classList.toggle('active');
    });
  }

  // Handle standard nav links (Home, About, Services, Portfolio, Results, Contact, Logo, Announcement link)
  document.querySelectorAll('.header__nav-link, #logo, .announcement-bar__link').forEach(link => {
    link.addEventListener('click', (e) => {
      if (link.id === 'nav-services') return; // Handled separately above
      
      const href = link.getAttribute('href');
      if (!href || href === '#' || !href.startsWith('#')) return;

      e.preventDefault();
      closeMobileNav();

      const targetId = href.replace('#', '');
      scrollToTarget(targetId);
    });
  });

  // Close menu, scroll, and highlight service card 3 times on service link click (mega menu & footer)
  document.querySelectorAll('.mega-menu__item, .footer__links a[href^="#service-"]').forEach(item => {
    item.addEventListener('click', (e) => {
      const href = item.getAttribute('href');
      if (!href || !href.startsWith('#')) return;
      
      e.preventDefault();
      closeMobileNav();
      
      const targetId = href.replace('#', '');
      const targetEl = document.getElementById(targetId);
      
      if (targetEl) {
        scrollToTarget(targetId);
        
        // Trigger pulse animation 3 times (using void to restart)
        targetEl.classList.remove('pulse-active');
        void targetEl.offsetWidth; // Force reflow
        targetEl.classList.add('pulse-active');
        
        // Clean up class after animation (0.8s * 3 = 2.4s)
        setTimeout(() => {
          targetEl.classList.remove('pulse-active');
        }, 2500);
      }
    });
  });

  // Close dropdown on clicking outside
  document.addEventListener('click', (e) => {
    if (dropdownWrapper && !dropdownWrapper.contains(e.target)) {
      dropdownWrapper.classList.remove('active');
    }
  });

  // ===== ACTIVE NAV LINK ON SCROLL =====
  const sections = document.querySelectorAll('section[id], header[id]');
  const navLinks = document.querySelectorAll('.header__nav-link');

  const setActiveNavLink = () => {
    const scrollPos = window.scrollY + 160;
    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');
      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  };

  window.addEventListener('scroll', setActiveNavLink, { passive: true });

  // ===== SCROLL REVEAL ANIMATIONS =====
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // ===== COUNTER ANIMATION (RESULTS) =====
  const animateCounters = (element) => {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000; // ms
    const stepTime = 16; // ms (~60fps)
    const steps = duration / stepTime;
    const increment = target / steps;
    let current = 0;

    const updateCounter = () => {
      current += increment;
      if (current >= target) {
        element.textContent = target + (target === 95 || target === 250 ? '%' : '+');
      } else {
        element.textContent = Math.floor(current) + (target === 95 || target === 250 ? '%' : '+');
        requestAnimationFrame(updateCounter);
      }
    };
    updateCounter();
  };

  const resultsSection = document.getElementById('results');
  if (resultsSection) {
    const statsObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const statVals = resultsSection.querySelectorAll('.result-stat-val');
          statVals.forEach(val => animateCounters(val));
          statsObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });
    statsObserver.observe(resultsSection);
  }

  // ===== SKILL BARS ANIMATION =====
  const animateSkillBars = (skillsWrapper) => {
    const fills = skillsWrapper.querySelectorAll('.skill-bar-fill');
    fills.forEach(fill => {
      const width = fill.getAttribute('data-width');
      fill.style.width = width;
    });
  };

  const skillsSection = document.getElementById('skills');
  if (skillsSection) {
    const skillsObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateSkillBars(skillsSection);
          skillsObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });
    skillsObserver.observe(skillsSection);
  }

  // ===== PORTFOLIO FILTER SYSTEM =====
  const filterBtns = document.querySelectorAll('.filter-btn');
  const portfolioCards = document.querySelectorAll('.portfolio-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Toggle active button
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      portfolioCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        
        // Setup fade-out transition
        card.style.opacity = '0';
        card.style.transform = 'scale(0.95)';
        card.style.transition = 'all 0.3s ease';

        setTimeout(() => {
          if (filterValue === 'all' || cardCategory === filterValue) {
            card.classList.remove('hidden');
            // Trigger reflow to apply opacity fade-in
            setTimeout(() => {
              card.style.opacity = '1';
              card.style.transform = 'scale(1)';
            }, 50);
          } else {
            card.classList.add('hidden');
          }
        }, 300);
      });
    });
  });



  // ===== CONTACT FORM VALIDATION & SUBMISSION =====
  const contactForm = document.getElementById('contactForm');
  const contactFormStatus = document.getElementById('contactFormStatus');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const submitBtn = document.getElementById('contactSubmit');
      const originalText = submitBtn.textContent;
      
      // Simple validation check
      const name = document.getElementById('contactName').value.trim();
      const email = document.getElementById('contactEmail').value.trim();
      const countryCode = document.getElementById('contactCountryCode') ? document.getElementById('contactCountryCode').value : '+91';
      const rawPhone = document.getElementById('contactPhone').value.trim();
      const phone = `${countryCode} ${rawPhone}`;
      const service = document.getElementById('contactService').value;
      const message = document.getElementById('contactMessage').value.trim();
      const businessVal = document.getElementById('contactBusiness') ? document.getElementById('contactBusiness').value.trim() : '';

      if (!name || !email || !rawPhone || !service || !message) {
        contactFormStatus.className = 'form-status error';
        contactFormStatus.textContent = '❌ Please fill out all required fields.';
        return;
      }

      // Show loader status
      submitBtn.disabled = true;
      submitBtn.textContent = 'Processing Request...';
      contactFormStatus.className = 'form-status';
      contactFormStatus.textContent = '⏳ Sending message...';

      // Send data to backend API
      fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name,
          email,
          phone,
          business: businessVal,
          service,
          message
        })
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Server error');
        }
        return response.json();
      })
      .then(data => {
        contactForm.reset();
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
        
        contactFormStatus.className = 'form-status success';
        contactFormStatus.innerHTML = `✅ Message Sent Successfully!<br><span style="font-size:0.85rem; font-weight: normal; color: var(--text-secondary);">Thank you. Selvamani will review your business request and contact you at ${email} within 24 hours.</span>`;
        
        // Clear message after 10 seconds
        setTimeout(() => {
          contactFormStatus.textContent = '';
        }, 10000);
      })
      .catch(error => {
        console.error('Error submitting contact form:', error);
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
        contactFormStatus.className = 'form-status error';
        contactFormStatus.textContent = '❌ Failed to send message. Please check your connection and try again.';
      });
    });
  }

  // ===== BACK TO TOP =====
  const backToTop = document.getElementById('backToTop');

  const handleBackToTopVisibility = () => {
    if (window.scrollY > 600) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }
  };

  window.addEventListener('scroll', handleBackToTopVisibility, { passive: true });
  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // =========================================================
  // ===== BOOKING MODAL WITH GOOGLE CALENDAR INTEGRATION =====
  // =========================================================

  const bookingModal = document.getElementById('bookingModal');
  const bookingOverlay = document.getElementById('bookingOverlay');
  const bookingClose = document.getElementById('bookingClose');
  const bookingForm = document.getElementById('bookingForm');

  const privacyModal = document.getElementById('privacyModal');
  const termsModal = document.getElementById('termsModal');

  // Steps
  const step1 = document.getElementById('bookingStep1');
  const step2 = document.getElementById('bookingStep2');
  const step3 = document.getElementById('bookingStep3');
  const toStep2Btn = document.getElementById('toStep2');
  const backToStep1Btn = document.getElementById('backToStep1');
  const bookingDone = document.getElementById('bookingDone');

  // Calendar elements
  const calMonth = document.getElementById('calMonth');
  const calGrid = document.getElementById('calGrid');
  const calPrev = document.getElementById('calPrev');
  const calNext = document.getElementById('calNext');

  // State
  let currentMonth = new Date();
  let selectedDate = null;
  let selectedTime = null;

  // ---- Open / Close Modal ----
  const openBookingModal = () => {
    bookingModal.classList.add('active');
    document.body.style.overflow = 'hidden';
    resetModal();
    renderCalendar();
  };

  const closeBookingModal = () => {
    bookingModal.classList.remove('active');
    document.body.style.overflow = '';
  };

  // Attach triggers to all "Free Consultation" elements
  document.querySelectorAll('.open-booking').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openBookingModal();
    });
  });

  bookingClose.addEventListener('click', closeBookingModal);
  bookingOverlay.addEventListener('click', closeBookingModal);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (bookingModal && bookingModal.classList.contains('active')) closeBookingModal();
      if (privacyModal && privacyModal.classList.contains('active')) privacyModal.classList.remove('active');
      if (termsModal && termsModal.classList.contains('active')) termsModal.classList.remove('active');
      document.body.style.overflow = '';
    }
  });

  // ---- Reset Modal ----
  const resetModal = () => {
    selectedDate = null;
    selectedTime = null;
    step1.classList.remove('booking-step--hidden');
    step2.classList.add('booking-step--hidden');
    step3.classList.add('booking-step--hidden');
    toStep2Btn.disabled = true;

    // Reset selected states and disabled states in DOM
    document.querySelectorAll('.booking-timeslot').forEach(s => {
      s.classList.remove('selected');
      s.classList.remove('disabled');
      s.disabled = false;
    });
    if (bookingForm) bookingForm.reset();

    currentMonth = new Date();
  };

  // ---- Calendar Rendering ----
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const renderCalendar = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    calMonth.textContent = `${monthNames[month]} ${year}`;

    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    calGrid.innerHTML = '';

    // Create spacing empty cells for previous days of the week
    for (let i = 0; i < firstDay; i++) {
      const emptyCell = document.createElement('button');
      emptyCell.type = 'button';
      emptyCell.className = 'booking-calendar__day empty';
      emptyCell.disabled = true;
      calGrid.appendChild(emptyCell);
    }

    // Add days
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'booking-calendar__day';
      btn.textContent = day;

      // Business rule: Disable Sundays and past dates
      if (date < today || date.getDay() === 0) {
        btn.classList.add('disabled');
        btn.disabled = true;
      } else {
        btn.addEventListener('click', () => selectDate(date, btn));
      }

      // Highlight today
      if (date.getTime() === today.getTime()) {
        btn.classList.add('today');
      }

      // Restore active selection
      if (selectedDate && date.getTime() === selectedDate.getTime()) {
        btn.classList.add('selected');
      }

      calGrid.appendChild(btn);
    }
  };

  calPrev.addEventListener('click', () => {
    currentMonth.setMonth(currentMonth.getMonth() - 1);
    renderCalendar();
  });

  calNext.addEventListener('click', () => {
    currentMonth.setMonth(currentMonth.getMonth() + 1);
    renderCalendar();
  });

  // ---- Date Selection ----
  const selectDate = (date, btn) => {
    selectedDate = date;
    document.querySelectorAll('.booking-calendar__day').forEach(d => d.classList.remove('selected'));
    btn.classList.add('selected');
    updateTimeSlots();
    updateContinueBtn();
  };

  // ---- Time Slot Live Update ----
  const updateTimeSlots = () => {
    if (!selectedDate) return;
    
    const now = new Date();
    // Check if selectedDate is today (local timezone)
    const isToday = selectedDate.getFullYear() === now.getFullYear() &&
                    selectedDate.getMonth() === now.getMonth() &&
                    selectedDate.getDate() === now.getDate();
                    
    document.querySelectorAll('.booking-timeslot').forEach(slot => {
      const timeStr = slot.dataset.time; // e.g. "09:00"
      const [hours, minutes] = timeStr.split(':').map(Number);
      
      const slotTime = new Date(selectedDate);
      slotTime.setHours(hours, minutes, 0, 0);
      
      if (isToday && slotTime <= now) {
        slot.disabled = true;
        slot.classList.add('disabled');
        // Deselect if already selected
        if (selectedTime === timeStr) {
          selectedTime = null;
          slot.classList.remove('selected');
          updateContinueBtn();
        }
      } else {
        slot.disabled = false;
        slot.classList.remove('disabled');
      }
    });
  };

  // ---- Time Slot Selection ----
  document.querySelectorAll('.booking-timeslot').forEach(slot => {
    slot.addEventListener('click', () => {
      if (slot.disabled) return;
      document.querySelectorAll('.booking-timeslot').forEach(s => s.classList.remove('selected'));
      slot.classList.add('selected');
      selectedTime = slot.dataset.time;
      updateContinueBtn();
    });
  });

  const updateContinueBtn = () => {
    toStep2Btn.disabled = !(selectedDate && selectedTime);
  };

  // ---- Step Navigation ----
  toStep2Btn.addEventListener('click', () => {
    step1.classList.add('booking-step--hidden');
    step2.classList.remove('booking-step--hidden');

    const dateStr = selectedDate.toLocaleDateString('en-US', {
      weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
    });
    const timeStr = formatTime(selectedTime);
    document.getElementById('selectedDateTime').innerHTML = `📅 Scheduled for: <strong>${dateStr} at ${timeStr}</strong>`;
  });

  backToStep1Btn.addEventListener('click', () => {
    step2.classList.add('booking-step--hidden');
    step1.classList.remove('booking-step--hidden');
  });

  bookingDone.addEventListener('click', closeBookingModal);

  // ---- Time formatting helper ----
  const formatTime = (time24) => {
    const [h, m] = time24.split(':').map(Number);
    const ampm = h >= 12 ? 'PM' : 'AM';
    const h12 = h % 12 || 12;
    return `${h12}:${m.toString().padStart(2, '0')} ${ampm}`;
  };

  // ---- Format ISO Date for Calendar API ----
  const formatGCalDate = (date, time) => {
    const [hours, minutes] = time.split(':').map(Number);
    const d = new Date(date);
    d.setHours(hours, minutes, 0, 0);

    const pad = (n) => n.toString().padStart(2, '0');
    return `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}T${pad(d.getHours())}${pad(d.getMinutes())}00`;
  };

  // ---- Form Submission (Render Google Calendar Template Link) ----
  bookingForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const clientName = document.getElementById('clientName').value.trim();
    const clientEmail = document.getElementById('clientEmail').value.trim();
    const countryCode = document.getElementById('clientCountryCode') ? document.getElementById('clientCountryCode').value : '+91';
    const rawPhone = document.getElementById('clientPhone').value.trim();
    const clientPhone = `${countryCode} ${rawPhone}`;
    const serviceType = document.getElementById('serviceType').value;
    const clientMessage = document.getElementById('clientMessage').value.trim();

    if (!clientName || !clientEmail || !rawPhone) {
      alert('Please fill in all required fields.');
      return;
    }

    // Calculate start and end meeting times
    const startDateTime = formatGCalDate(selectedDate, selectedTime);

    const [startH, startM] = selectedTime.split(':').map(Number);
    const endDate = new Date(selectedDate);
    endDate.setHours(startH, startM + CONSULTATION_DURATION, 0, 0);
    const endTime = `${endDate.getHours().toString().padStart(2, '0')}:${endDate.getMinutes().toString().padStart(2, '0')}`;
    const endDateTime = formatGCalDate(selectedDate, endTime);

    // Build event text templates
    const eventTitle = `${BUSINESS_NAME} - ${clientName} (${serviceType})`;

    const eventDetails = [
      `💼 Strategy Session: ${serviceType}`,
      `👤 Client Name: ${clientName}`,
      `📧 Client Email: ${clientEmail}`,
      `📞 Client Phone: ${clientPhone}`,
      clientMessage ? `📝 Strategic Goals: ${clientMessage}` : '',
      '',
      `Booking request generated via Selvamani's Portfolio Website`,
      'Google Meet link will be generated automatically upon saving.'
    ].filter(Boolean).join('\n');

    // Setup template query arguments
    const gcalParams = new URLSearchParams({
      action: 'TEMPLATE',
      text: eventTitle,
      dates: `${startDateTime}/${endDateTime}`,
      details: eventDetails,
      add: `${BUSINESS_EMAIL},${clientEmail}`,
      crm: 'AVAILABLE',
      trp: 'true'
    });

    const googleCalendarURL = `https://calendar.google.com/calendar/render?${gcalParams.toString()}`;

    // Show loader status on submission button
    const submitBtn = document.getElementById('bookingSubmit');
    const submitText = document.getElementById('submitText');
    const submitLoader = document.getElementById('submitLoader');

    if (submitBtn) submitBtn.disabled = true;
    if (submitText) submitText.style.display = 'none';
    if (submitLoader) submitLoader.style.display = 'inline';

    const showBookingSuccessScreen = () => {
      if (submitBtn) submitBtn.disabled = false;
      if (submitText) submitText.style.display = 'inline';
      if (submitLoader) submitLoader.style.display = 'none';

      // Show success results screen
      step2.classList.add('booking-step--hidden');
      step3.classList.remove('booking-step--hidden');

      const dateStr = selectedDate ? selectedDate.toLocaleDateString('en-US', {
        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
      }) : 'Selected Date';

      document.getElementById('successDetails').innerHTML = `
        <strong>📅 Date:</strong> ${dateStr}<br>
        <strong>🕐 Time:</strong> ${formatTime(selectedTime)} - ${formatTime(endTime)}<br>
        <strong>🎯 Service:</strong> ${serviceType}<br>
        <strong>👤 Client Name:</strong> ${clientName}<br>
        <strong>📧 Client Email:</strong> ${clientEmail}<br>
        <strong>📞 Client Phone:</strong> ${clientPhone}
        ${clientMessage ? `<br><strong>📝 Goals:</strong> ${clientMessage}` : ''}
      `;

      // Open GCal window template in new tab
      window.open(googleCalendarURL, '_blank');
    };

    // Submit booking data to backend Express server
    fetch('/api/booking', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: clientName,
        email: clientEmail,
        phone: clientPhone,
        service: serviceType,
        date: selectedDate ? selectedDate.toISOString() : new Date().toISOString(),
        time: selectedTime,
        message: clientMessage
      })
    })
    .then(response => {
      showBookingSuccessScreen();
    })
    .catch(error => {
      console.warn('Server storage skipped, proceeding directly to Google Calendar booking:', error);
      showBookingSuccessScreen();
    });
  });

  // ===== PRIVACY POLICY & TERMS OF SERVICE MODALS =====
  const openPrivacyBtn = document.getElementById('openPrivacy');
  const privacyCloseBtn = document.getElementById('privacyClose');
  const privacyOverlayBtn = document.getElementById('privacyOverlay');

  const openTermsBtn = document.getElementById('openTerms');
  const termsCloseBtn = document.getElementById('termsClose');
  const termsOverlayBtn = document.getElementById('termsOverlay');

  const openInfoModal = (modal) => {
    if (!modal) return;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  const closeInfoModal = (modal) => {
    if (!modal) return;
    modal.classList.remove('active');
    document.body.style.overflow = '';
  };

  // Privacy Policy Triggers
  document.querySelectorAll('.open-privacy').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openInfoModal(privacyModal);
    });
  });
  if (openPrivacyBtn) {
    openPrivacyBtn.addEventListener('click', (e) => {
      e.preventDefault();
      openInfoModal(privacyModal);
    });
  }
  if (privacyCloseBtn) {
    privacyCloseBtn.addEventListener('click', () => closeInfoModal(privacyModal));
  }
  if (privacyOverlayBtn) {
    privacyOverlayBtn.addEventListener('click', () => closeInfoModal(privacyModal));
  }

  // Terms of Service Triggers
  document.querySelectorAll('.open-terms').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openInfoModal(termsModal);
    });
  });
  if (openTermsBtn) {
    openTermsBtn.addEventListener('click', (e) => {
      e.preventDefault();
      openInfoModal(termsModal);
    });
  }
  if (termsCloseBtn) {
    termsCloseBtn.addEventListener('click', () => closeInfoModal(termsModal));
  }
  if (termsOverlayBtn) {
    termsOverlayBtn.addEventListener('click', () => closeInfoModal(termsModal));
  }

  // =========================================================
  // 🛸 3D FLYING SOCIAL MEDIA ICONS BACKGROUND ENGINE
  // Every icon rendered as a SEPARATE, individual 3D floating brand badge
  // Small size, slow motion, cursor-reactive 3D parallax (LEFT, RIGHT, TOP, DOWN)
  // =========================================================

  class FlyingIconsEngine {
    constructor() {
      this.canvas = document.getElementById('flyingIconsCanvas');
      if (!this.canvas) return;

      this.ctx = this.canvas.getContext('2d');
      this.dpr = window.devicePixelRatio || 1;

      // Settings — small icons, responsive float motion
      this.iconSize = 34;        // Small icon size scale in pixels
      this.floatSpeed = 0.50;    // Increased by 20% for active responsive movement
      this.iconCount = 28;       // Number of individual floating icons

      // Motion State for Cursor Parallax
      this.mouseX = 0;
      this.mouseY = 0;
      this.targetMouseX = 0;
      this.targetMouseY = 0;
      this.lastMouseX = 0;
      this.lastMouseY = 0;
      this.mouseVelX = 0;
      this.mouseVelY = 0;
      this.time = 0;

      // Cursor Light Aura & Flowing Blue Shadow State
      this.cursorX = 0;
      this.cursorY = 0;
      this.glowOpacity = 0;
      this.isMouseMoving = false;
      this.mouseStopTimer = null;
      this.glowTrail = [];

      // Loaded Assets & Individual Badges
      this.brandBadges = [];
      this.icons = [];

      this.init();
    }

    init() {
      this.resizeCanvas();
      window.addEventListener('resize', () => this.resizeCanvas());

      this.createIndividualBrandBadges();
      this.setupEventListeners();
      this.spawnIcons();
      this.animate();
    }

    resizeCanvas() {
      this.width = window.innerWidth;
      this.height = window.innerHeight;
      this.canvas.width = this.width * this.dpr;
      this.canvas.height = this.height * this.dpr;
      this.canvas.style.width = `${this.width}px`;
      this.canvas.style.height = `${this.height}px`;
      this.ctx.setTransform(1, 0, 0, 1, 0, 0);
      this.ctx.scale(this.dpr, this.dpr);
    }

    // Pre-render individual, SEPARATE 3D Social Media Brand Badges
    createIndividualBrandBadges() {
      const brands = [
        { name: 'Google Ads', bg1: '#4285F4', bg2: '#34A853', text: 'Ads', icon: '🎯', glow: '#4285F4' },
        { name: 'Meta', bg1: '#0084FF', bg2: '#00C6FF', text: 'Meta', icon: '∞', glow: '#0084FF' },
        { name: 'Instagram', bg1: '#F09433', bg2: '#BC1888', text: 'IG', icon: '📷', glow: '#E1306C' },
        { name: 'YouTube', bg1: '#FF0000', bg2: '#FF4E50', text: 'YT', icon: '▶', glow: '#FF0000' },
        { name: 'LinkedIn', bg1: '#0A66C2', bg2: '#00A8FF', text: 'in', icon: '💼', glow: '#0A66C2' },
        { name: 'X / Twitter', bg1: '#1E293B', bg2: '#0F172A', text: 'X', icon: '𝕏', glow: '#8B5CF6' },
        { name: 'WhatsApp', bg1: '#25D366', bg2: '#10B981', text: 'WA', icon: '💬', glow: '#25D366' },
        { name: 'GBP / GMB', bg1: '#EA4335', bg2: '#FF6B6B', text: 'GMB', icon: '📍', glow: '#EA4335' },
        { name: 'TikTok', bg1: '#0F172A', bg2: '#000000', text: 'TT', icon: '🎵', glow: '#00F2FE' },
        { name: 'Pinterest', bg1: '#BD081C', bg2: '#FF4B4B', text: 'Pin', icon: '📌', glow: '#BD081C' },
        { name: 'Snapchat', bg1: '#FFFC00', bg2: '#FEE100', text: 'Snap', icon: '👻', glow: '#FFFC00' },
        { name: 'Local SEO', bg1: '#10B981', bg2: '#34D399', text: 'SEO', icon: '📈', glow: '#10B981' }
      ];

      this.brandBadges = brands.map(brand => {
        const size = 120;
        const offCanvas = document.createElement('canvas');
        offCanvas.width = size;
        offCanvas.height = size;
        const oCtx = offCanvas.getContext('2d');

        // Draw Badge Background with rounded rectangle & 3D bevel gradient
        oCtx.save();
        oCtx.shadowColor = brand.glow;
        oCtx.shadowBlur = 20;

        const rad = 28;
        oCtx.beginPath();
        oCtx.moveTo(rad, 0);
        oCtx.lineTo(size - rad, 0);
        oCtx.quadraticCurveTo(size, 0, size, rad);
        oCtx.lineTo(size, size - rad);
        oCtx.quadraticCurveTo(size, size, size - rad, size);
        oCtx.lineTo(rad, size);
        oCtx.quadraticCurveTo(0, size, 0, size - rad);
        oCtx.lineTo(0, rad);
        oCtx.quadraticCurveTo(0, 0, rad, 0);
        oCtx.closePath();

        const grad = oCtx.createLinearGradient(0, 0, size, size);
        grad.addColorStop(0, brand.bg1);
        grad.addColorStop(1, brand.bg2);
        oCtx.fillStyle = grad;
        oCtx.fill();

        // Shiny Glass reflection overlay
        const rGrad = oCtx.createLinearGradient(0, 0, size, size * 0.5);
        rGrad.addColorStop(0, 'rgba(255, 255, 255, 0.55)');
        rGrad.addColorStop(0.5, 'rgba(255, 255, 255, 0.15)');
        rGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');
        oCtx.fillStyle = rGrad;
        oCtx.fill();

        // Draw Center Social Media Symbol
        oCtx.restore();
        oCtx.save();
        oCtx.shadowColor = 'rgba(0, 0, 0, 0.65)';
        oCtx.shadowBlur = 10;
        oCtx.font = 'bold 42px sans-serif';
        oCtx.textAlign = 'center';
        oCtx.textBaseline = 'middle';
        oCtx.fillStyle = '#ffffff';
        oCtx.fillText(brand.icon, size / 2, size / 2 - 8);

        // Draw Subtitle Label
        oCtx.font = '800 15px Plus Jakarta Sans, Inter, sans-serif';
        oCtx.fillStyle = '#ffffff';
        oCtx.fillText(brand.text, size / 2, size / 2 + 28);
        oCtx.restore();

        return offCanvas;
      });
    }

    setupEventListeners() {
      const handlePointerMove = (x, y) => {
        this.cursorX = x;
        this.cursorY = y;
        this.isMouseMoving = true;

        // Push glowing sky-blue trail particle
        this.glowTrail.push({
          x: x,
          y: y,
          alpha: 1.0,
          size: 30
        });
        if (this.glowTrail.length > 16) this.glowTrail.shift();

        // Detect when pointer stops moving (fade out shadow once stationary)
        if (this.mouseStopTimer) clearTimeout(this.mouseStopTimer);
        this.mouseStopTimer = setTimeout(() => {
          this.isMouseMoving = false;
        }, 120);
      };

      window.addEventListener('mousemove', (e) => {
        const deltaX = e.clientX - (this.lastMouseX || e.clientX);
        const deltaY = e.clientY - (this.lastMouseY || e.clientY);
        this.lastMouseX = e.clientX;
        this.lastMouseY = e.clientY;

        // Calculate cursor movement velocity (LEFT, RIGHT, TOP, DOWN)
        this.mouseVelX += deltaX * 0.10;
        this.mouseVelY += deltaY * 0.10;

        this.targetMouseX = (e.clientX - this.width / 2);
        this.targetMouseY = (e.clientY - this.height / 2);

        handlePointerMove(e.clientX, e.clientY);
      });

      window.addEventListener('mouseleave', () => {
        this.isMouseMoving = false;
      });

      // Mobile Touch Events (touchstart, touchmove, touchend, touchcancel)
      window.addEventListener('touchstart', (e) => {
        if (e.touches.length > 0) {
          const touch = e.touches[0];
          this.lastMouseX = touch.clientX;
          this.lastMouseY = touch.clientY;
          this.targetMouseX = (touch.clientX - this.width / 2);
          this.targetMouseY = (touch.clientY - this.height / 2);
          handlePointerMove(touch.clientX, touch.clientY);
        }
      }, { passive: true });

      window.addEventListener('touchmove', (e) => {
        if (e.touches.length > 0) {
          const touch = e.touches[0];
          const deltaX = touch.clientX - (this.lastMouseX || touch.clientX);
          const deltaY = touch.clientY - (this.lastMouseY || touch.clientY);
          this.lastMouseX = touch.clientX;
          this.lastMouseY = touch.clientY;

          this.mouseVelX += deltaX * 0.10;
          this.mouseVelY += deltaY * 0.10;

          this.targetMouseX = (touch.clientX - this.width / 2);
          this.targetMouseY = (touch.clientY - this.height / 2);

          handlePointerMove(touch.clientX, touch.clientY);
        }
      }, { passive: true });

      window.addEventListener('touchend', () => {
        if (this.mouseStopTimer) clearTimeout(this.mouseStopTimer);
        this.isMouseMoving = false;
      }, { passive: true });

      window.addEventListener('touchcancel', () => {
        if (this.mouseStopTimer) clearTimeout(this.mouseStopTimer);
        this.isMouseMoving = false;
      }, { passive: true });
    }

    // Spawn 3D floating icon particles (every icon separate)
    spawnIcons() {
      this.icons = [];
      for (let i = 0; i < this.iconCount; i++) {
        this.icons.push(this.createIcon(i));
      }
    }

    createIcon(index) {
      return {
        brandIndex: index % this.brandBadges.length,
        x: (Math.random() - 0.5) * this.width * 1.3,
        y: (Math.random() - 0.5) * this.height * 1.3,
        z: Math.random() * 700 - 350, // 3D depth
        rotZ: Math.random() * Math.PI * 2,
        vRotZ: (Math.random() - 0.5) * 0.008,
        // Sine wave orbital drift math for active floating motion
        phaseX: Math.random() * Math.PI * 2,
        phaseY: Math.random() * Math.PI * 2,
        phaseZ: Math.random() * Math.PI * 2,
        freq: 0.0006 + Math.random() * 0.0008,
        amplitudeX: 45 + Math.random() * 55,
        amplitudeY: 35 + Math.random() * 50,
        amplitudeZ: 30 + Math.random() * 40
      };
    }

    animate() {
      this.time += 16 * this.floatSpeed;

      // Smooth mouse lerp & velocity dampening
      this.mouseX += (this.targetMouseX - this.mouseX) * 0.05;
      this.mouseY += (this.targetMouseY - this.mouseY) * 0.05;
      this.mouseVelX *= 0.90;
      this.mouseVelY *= 0.90;

      this.ctx.clearRect(0, 0, this.width, this.height);

      // Smoothly fade blue light aura opacity (Fade IN on mouse move, Fade OUT on mouse stop)
      if (this.isMouseMoving) {
        this.glowOpacity += (1 - this.glowOpacity) * 0.15;
      } else {
        this.glowOpacity += (0 - this.glowOpacity) * 0.09;
      }

      // Render Dynamic Flowing Blue Light Shadow Aura around cursor
      if (this.glowOpacity > 0.005) {
        this.ctx.save();

        // 1. Draw soft flowing light trail behind cursor
        this.glowTrail.forEach(p => {
          p.alpha *= 0.88;
          p.size *= 0.95;
          if (p.alpha > 0.01) {
            const trailGrad = this.ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 1.8);
            trailGrad.addColorStop(0, `rgba(56, 189, 248, ${0.15 * p.alpha * this.glowOpacity})`);
            trailGrad.addColorStop(0.5, `rgba(147, 197, 253, ${0.06 * p.alpha * this.glowOpacity})`);
            trailGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
            this.ctx.fillStyle = trailGrad;
            this.ctx.beginPath();
            this.ctx.arc(p.x, p.y, p.size * 1.8, 0, Math.PI * 2);
            this.ctx.fill();
          }
        });
        this.glowTrail = this.glowTrail.filter(p => p.alpha > 0.01);

        // 2. Draw main ultra-low, soft light cyan/blue ambient pointer aura
        const auraRadius = 90;
        const auraGrad = this.ctx.createRadialGradient(
          this.cursorX, this.cursorY, 0,
          this.cursorX, this.cursorY, auraRadius
        );
        auraGrad.addColorStop(0, `rgba(56, 189, 248, ${0.18 * this.glowOpacity})`);    // Soft light sky-blue core
        auraGrad.addColorStop(0.4, `rgba(147, 197, 253, ${0.08 * this.glowOpacity})`); // Very subtle ambient glow
        auraGrad.addColorStop(0.8, `rgba(167, 139, 250, ${0.02 * this.glowOpacity})`); // Extremely faint outer edge
        auraGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');

        this.ctx.fillStyle = auraGrad;
        this.ctx.beginPath();
        this.ctx.arc(this.cursorX, this.cursorY, auraRadius, 0, Math.PI * 2);
        this.ctx.fill();

        this.ctx.restore();
      }

      const fov = 600;
      const centerX = this.width / 2;
      const centerY = this.height / 2;

      // Sort icons by Z coordinate for realistic 3D depth layering
      const sortedIcons = [...this.icons].sort((a, b) => b.z - a.z);
      const isDarkTheme = document.body.classList.contains('dark-theme');

      sortedIcons.forEach(icon => {
        // Slow-motion 3D airborne orbital sine drift
        const driftX = Math.sin(this.time * icon.freq + icon.phaseX) * icon.amplitudeX * this.floatSpeed;
        const driftY = Math.cos(this.time * icon.freq * 0.8 + icon.phaseY) * icon.amplitudeY * this.floatSpeed;
        const driftZ = Math.sin(this.time * icon.freq * 0.5 + icon.phaseZ) * icon.amplitudeZ * this.floatSpeed;

        // Dynamic Cursor Physics (Moving TOP, DOWN, LEFT, RIGHT based on cursor direction & velocity)
        const parallaxX = (this.mouseX / this.width + this.mouseVelX * 0.04) * (icon.z + 500) * 0.18;
        const parallaxY = (this.mouseY / this.height + this.mouseVelY * 0.04) * (icon.z + 500) * 0.18;

        const currentX = icon.x + driftX + parallaxX;
        const currentY = icon.y + driftY + parallaxY;
        const currentZ = icon.z + driftZ;

        // 3D Perspective Projection
        const scale = fov / (fov + currentZ + 400);
        const projX = centerX + currentX * scale;
        const projY = centerY + currentY * scale;

        // Small icon size calculation based on settings & depth
        const renderDim = Math.max(12, this.iconSize * scale);

        // Opacity fading based on depth Z
        const alpha = Math.min(1, Math.max(0.18, (currentZ + 500) / 900)) * (isDarkTheme ? 0.80 : 0.65);

        // Rotate icon slowly in 3D air
        icon.rotZ += icon.vRotZ * this.floatSpeed;

        // Wrap around screen boundaries seamlessly
        if (projX < -100) icon.x += this.width * 1.25;
        if (projX > this.width + 100) icon.x -= this.width * 1.25;
        if (projY < -100) icon.y += this.height * 1.25;
        if (projY > this.height + 100) icon.y -= this.height * 1.25;

        // Draw individual separate brand badge
        const badgeCanvas = this.brandBadges[icon.brandIndex % this.brandBadges.length];
        if (badgeCanvas) {
          this.ctx.save();
          this.ctx.translate(projX, projY);
          this.ctx.rotate(icon.rotZ);
          this.ctx.globalAlpha = alpha;
          this.ctx.drawImage(badgeCanvas, -renderDim / 2, -renderDim / 2, renderDim, renderDim);
          this.ctx.restore();
        }
      });

      requestAnimationFrame(() => this.animate());
    }
  }

  // Instantiate the 3D Flying Icons Engine
  new FlyingIconsEngine();

});