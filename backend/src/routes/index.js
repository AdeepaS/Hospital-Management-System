const express = require('express');
const authRoutes = require('./authRoute');
const doctorRoutes = require('./doctorRoutes');
const appointmentRoutes = require('./appointmentRoutes');

const router = express.Router();

// Example base route for testing
router.get('/', (req, res) => {
  res.json({ message: 'API is working' });
});

// Mount routes
router.use('/auth', authRoutes);
router.use('/doctors', doctorRoutes);
router.use('/appointments', appointmentRoutes);

module.exports = router;
