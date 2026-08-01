const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const DATA_DIR = path.join(__dirname, '..', 'data');
const APPOINTMENTS_FILE = path.join(DATA_DIR, 'appointments.json');
const CONTACTS_FILE = path.join(DATA_DIR, 'contacts.json');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

const initializeFile = (filePath, defaultData = []) => {
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, JSON.stringify(defaultData, null, 2), 'utf8');
  }
};

initializeFile(APPOINTMENTS_FILE);
initializeFile(CONTACTS_FILE);

const readJSON = (filePath) => {
  try {
    const raw = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(raw);
  } catch (err) {
    console.error(`Error reading ${filePath}:`, err);
    return [];
  }
};

const writeJSON = (filePath, data) => {
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
    return true;
  } catch (err) {
    console.error(`Error writing ${filePath}:`, err);
    return false;
  }
};

// Available Clinic Slot Master Definitions
const MASTER_SLOTS = [
  { time: '10:00 - 11:00 AM', session: 'Morning' },
  { time: '11:00 - 12:00 PM', session: 'Morning' },
  { time: '12:00 - 1:00 PM', session: 'Morning' },
  { time: '4:00 - 5:00 PM', session: 'Evening' },
  { time: '5:00 - 6:00 PM', session: 'Evening' },
  { time: '6:00 - 7:00 PM', session: 'Evening' },
  { time: '7:00 - 8:00 PM', session: 'Evening' },
  { time: '8:00 - 9:00 PM', session: 'Evening' }
];

// --- API ENDPOINTS ---

// GET /api/appointments/slots?date=YYYY-MM-DD
app.get('/api/appointments/slots', (req, res) => {
  const date = req.query.date;
  if (!date) {
    return res.status(400).json({ error: 'Date parameter is required (YYYY-MM-DD).' });
  }

  const appointments = readJSON(APPOINTMENTS_FILE);
  const bookedForDate = appointments.filter(a => a.date === date).map(a => a.slot);

  const slotsWithStatus = MASTER_SLOTS.map(s => ({
    ...s,
    available: !bookedForDate.includes(s.time)
  }));

  const totalAvailable = slotsWithStatus.filter(s => s.available).length;

  res.json({
    date,
    totalSlots: MASTER_SLOTS.length,
    availableSlotsCount: totalAvailable,
    slots: slotsWithStatus
  });
});

// POST /api/booking
app.post('/api/booking', (req, res) => {
  const { name, email, phone, service, date, slot, message } = req.body;

  if (!name || !email || !phone || !service || !date || !slot) {
    return res.status(400).json({ error: 'All required fields (name, email, phone, service, date, slot) must be provided.' });
  }

  const appointments = readJSON(APPOINTMENTS_FILE);

  // Check double booking
  const existingBooking = appointments.find(a => a.date === date && a.slot === slot);
  if (existingBooking) {
    return res.status(409).json({
      error: `Slot '${slot}' on ${date} has already been reserved. Please select another slot.`
    });
  }

  const masterMatch = MASTER_SLOTS.find(s => s.time === slot);
  const session = masterMatch ? masterMatch.session : 'General';

  const newAppointment = {
    id: 'apt_' + Date.now().toString(36) + Math.random().toString(36).substring(2, 6),
    name: name.trim(),
    email: email.trim(),
    phone: phone.trim(),
    service,
    date,
    slot,
    session,
    message: message ? message.trim() : '',
    createdAt: new Date().toISOString()
  };

  appointments.push(newAppointment);

  if (writeJSON(APPOINTMENTS_FILE, appointments)) {
    console.log(`[BOOKING CONFIRMED] ${name} booked ${slot} on ${date} for ${service}`);
    res.status(201).json({
      success: true,
      message: 'Appointment successfully booked!',
      appointment: newAppointment
    });
  } else {
    res.status(500).json({ error: 'Server error saving appointment.' });
  }
});

// POST /api/contact
app.post('/api/contact', (req, res) => {
  const { name, email, phone, message } = req.body;

  if (!name || !email || !phone || !message) {
    return res.status(400).json({ error: 'Please complete all required fields.' });
  }

  const contacts = readJSON(CONTACTS_FILE);
  const newContact = {
    id: 'cnt_' + Date.now().toString(36) + Math.random().toString(36).substring(2, 6),
    name: name.trim(),
    email: email.trim(),
    phone: phone.trim(),
    message: message.trim(),
    createdAt: new Date().toISOString()
  };

  contacts.push(newContact);

  if (writeJSON(CONTACTS_FILE, contacts)) {
    console.log(`[CONTACT RECEIVED] Message from ${name} (${email})`);
    res.status(201).json({
      success: true,
      message: 'Thank you for reaching out! Our team will contact you shortly.'
    });
  } else {
    res.status(500).json({ error: 'Server error saving contact submission.' });
  }
});

app.listen(PORT, () => {
  console.log(`==================================================`);
  console.log(`🦷 3D Dental Clinic API Server running on port ${PORT}`);
  console.log(`💾 Appointments file: ${APPOINTMENTS_FILE}`);
  console.log(`💾 Contacts file: ${CONTACTS_FILE}`);
  console.log(`==================================================`);
});
