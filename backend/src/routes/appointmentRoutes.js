const express = require('express');
const router = express.Router();
const { createAppointment } = require('../controllers/appointmentController');
const { protect, authorize } = require('../middleware/authMiddlewae');

// POST /api/appointments (protected, patient only)
router.post('/', protect, authorize('patient'), createAppointment);

module.exports = router;
