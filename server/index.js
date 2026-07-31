const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const APPOINTMENTS_FILE = path.join(__dirname, '../data/appointments.json');

function ensureDataFile() {
  const dataDir = path.dirname(APPOINTMENTS_FILE);
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
  if (!fs.existsSync(APPOINTMENTS_FILE)) {
    fs.writeFileSync(APPOINTMENTS_FILE, JSON.stringify([], null, 2));
  }
}

app.post('/api/appointments', (req, res) => {
  try {
    ensureDataFile();
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

app.get('/api/appointments', (req, res) => {
  try {
    ensureDataFile();
    const rawData = fs.readFileSync(APPOINTMENTS_FILE, 'utf8');
    const appointments = JSON.parse(rawData || '[]');
    res.json({ success: true, count: appointments.length, appointments });
  } catch (error) {
    console.error('Error fetching appointments:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

app.listen(PORT, () => {
  console.log(`Dental Clinic Express Backend running on http://localhost:${PORT}`);
});
