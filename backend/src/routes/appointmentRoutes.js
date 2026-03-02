const express = require('express');
const router = express.Router();
const { 
  createAppointment, 
  getMyAppointments, 
  getAllAppointments, 
  cancelAppointment 
} = require('../controllers/appointmentController');
const { protect, authorize } = require('../middleware/authMiddlewae');

// GET /api/appointments/my (protected, patient or doctor)
router.get('/my', protect, authorize('patient', 'doctor'), getMyAppointments);

// GET /api/appointments (protected, admin only)
router.get('/', protect, authorize('admin'), getAllAppointments);

// POST /api/appointments (protected, patient only)
router.post('/', protect, authorize('patient'), createAppointment);

// PUT /api/appointments/:id/cancel (protected, all roles with authorization check)
router.put('/:id/cancel', protect, authorize('patient', 'doctor', 'admin'), cancelAppointment);

module.exports = router;
