const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname)));

const APPOINTMENTS_FILE = path.join(__dirname, 'data', 'appointments.json');
const BOOKINGS_FILE = path.join(__dirname, 'data', 'bookings.json');
const CONTACTS_FILE = path.join(__dirname, 'data', 'contacts.json');

function ensureDataFiles() {
  const dataDir = path.join(__dirname, 'data');
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
  if (!fs.existsSync(APPOINTMENTS_FILE)) {
    fs.writeFileSync(APPOINTMENTS_FILE, JSON.stringify([], null, 2));
  }
  if (!fs.existsSync(BOOKINGS_FILE)) {
    fs.writeFileSync(BOOKINGS_FILE, JSON.stringify([], null, 2));
  }
  if (!fs.existsSync(CONTACTS_FILE)) {
    fs.writeFileSync(CONTACTS_FILE, JSON.stringify([], null, 2));
  }
}

app.post('/api/appointments', (req, res) => {
  try {
    ensureDataFiles();
    const { name, phone, email, service, doctor, date, time, notes } = req.body;

    if (!name || !phone || !service || !date || !time) {
      return res.status(400).json({ success: false, message: 'Missing required appointment fields.' });
    }

    const rawData = fs.readFileSync(APPOINTMENTS_FILE, 'utf8');
    const appointments = JSON.parse(rawData || '[]');

    const newAppointment = {
      id: 'APT-' + Date.now(),
      name,
      phone,
      email: email || '',
      service,
      doctor: doctor || 'Any Specialist',
      date,
      time,
      notes: notes || '',
      status: 'Confirmed',
      createdAt: new Date().toISOString()
    };

    appointments.push(newAppointment);
    fs.writeFileSync(APPOINTMENTS_FILE, JSON.stringify(appointments, null, 2));

    console.log('[Express API] New Appointment Saved:', newAppointment.id);

    return res.status(201).json({
      success: true,
      message: 'Appointment booked successfully!',
      appointment: newAppointment
    });
  } catch (error) {
    console.error('Error saving appointment:', error);
    return res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

app.post('/api/contact', (req, res) => {
  try {
    ensureDataFiles();
    const { name, email, phone, message } = req.body;
    const rawData = fs.readFileSync(CONTACTS_FILE, 'utf8');
    const contacts = JSON.parse(rawData || '[]');

    const newContact = {
      id: 'CNT-' + Date.now(),
      name,
      email,
      phone,
      message,
      createdAt: new Date().toISOString()
    };

    contacts.push(newContact);
    fs.writeFileSync(CONTACTS_FILE, JSON.stringify(contacts, null, 2));

    return res.status(201).json({ success: true, message: 'Message sent successfully!' });
  } catch (error) {
    console.error('Error saving contact message:', error);
    return res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

app.listen(PORT, () => {
  console.log(`ApexDent Clinic Server running on http://localhost:${PORT}`);
});
