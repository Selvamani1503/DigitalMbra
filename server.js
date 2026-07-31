const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS and JSON parsing
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Data storage configuration
const DATA_DIR = path.join(__dirname, 'data');
const CONTACTS_FILE = path.join(DATA_DIR, 'contacts.json');
const BOOKINGS_FILE = path.join(DATA_DIR, 'bookings.json');

// Ensure data directory and files exist
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

const initializeFile = (filePath) => {
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, JSON.stringify([], null, 2), 'utf8');
  }
};

initializeFile(CONTACTS_FILE);
initializeFile(BOOKINGS_FILE);

// Serve static frontend assets from the root directory
app.use(express.static(__dirname));

// Helper to read JSON data safely
const readData = (filePath) => {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(content);
  } catch (error) {
    console.error(`Error reading file ${filePath}:`, error);
    return [];
  }
};

// Helper to write JSON data safely
const writeData = (filePath, data) => {
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
    return true;
  } catch (error) {
    console.error(`Error writing file ${filePath}:`, error);
    return false;
  }
};

// --- API ENDPOINTS ---

// Contact Form Submission
app.post('/api/contact', (req, res) => {
  const { name, email, phone, business, service, message } = req.body;

  // Basic validation
  if (!name || !email || !phone || !service || !message) {
    return res.status(400).json({ error: 'Please fill out all required fields.' });
  }

  const contacts = readData(CONTACTS_FILE);
  const newContact = {
    id: Date.now().toString(36) + Math.random().toString(36).substr(2, 5),
    name: name.trim(),
    email: email.trim(),
    phone: phone.trim(),
    business: business ? business.trim() : '',
    service,
    message: message.trim(),
    timestamp: new Date().toISOString()
  };

  contacts.push(newContact);

  if (writeData(CONTACTS_FILE, contacts)) {
    console.log(`[Contact Submission] Saved message from ${name} (${email})`);
    return res.status(201).json({ success: true, message: 'Message sent successfully.' });
  } else {
    return res.status(500).json({ error: 'Server error saving contact submission.' });
  }
});

// Booking Submission
app.post('/api/booking', (req, res) => {
  const { name, email, phone, service, date, time, message } = req.body;

  // Basic validation
  if (!name || !email || !phone || !service || !date || !time) {
    return res.status(400).json({ error: 'Please fill out all required fields.' });
  }

  const bookings = readData(BOOKINGS_FILE);
  const newBooking = {
    id: Date.now().toString(36) + Math.random().toString(36).substr(2, 5),
    name: name.trim(),
    email: email.trim(),
    phone: phone.trim(),
    service,
    date, // ISO string or date representation
    time,
    message: message ? message.trim() : '',
    timestamp: new Date().toISOString()
  };

  bookings.push(newBooking);

  if (writeData(BOOKINGS_FILE, bookings)) {
    console.log(`[Booking Submission] Saved booking from ${name} on ${date} at ${time}`);
    return res.status(201).json({ success: true, message: 'Booking submitted successfully.' });
  } else {
    return res.status(500).json({ error: 'Server error saving booking.' });
  }
});

// Catch-all route to serve the index.html for frontend routing or static display
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Start Server
app.listen(PORT, () => {
  console.log(`==================================================`);
  console.log(`🚀 Server is running on: http://localhost:${PORT}`);
  console.log(`📁 Static files served from: ${__dirname}`);
  console.log(`💾 Contacts storage: ${CONTACTS_FILE}`);
  console.log(`💾 Bookings storage: ${BOOKINGS_FILE}`);
  console.log(`==================================================`);
});
