const express = require('express');
const router = express.Router();
const { 
  getDoctors, 
  getDoctorById,
  createDoctor,
  updateDoctor,
  updateDoctorStatus,
  deleteDoctor,
  getDoctorAppointments,
  getSpecializations
} = require('../controllers/doctorController');
const { protect, authorize } = require('../middleware/authMiddlewae');

// Public routes
// GET /api/doctors?page=1&limit=10&search=...&specialization=...&status=...&date=...
router.get('/', getDoctors);

// GET /api/doctors/specializations/list
router.get('/specializations/list', getSpecializations);

// GET /api/doctors/:id
router.get('/:id', getDoctorById);

// Admin-only routes
// POST /api/doctors
router.post('/', protect, authorize('admin'), createDoctor);

// PUT /api/doctors/:id
router.put('/:id', protect, authorize('admin'), updateDoctor);

// PATCH /api/doctors/:id/status
router.patch('/:id/status', protect, authorize('admin'), updateDoctorStatus);

// DELETE /api/doctors/:id
router.delete('/:id', protect, authorize('admin'), deleteDoctor);

// GET /api/doctors/:id/appointments
router.get('/:id/appointments', protect, authorize('admin'), getDoctorAppointments);

module.exports = router;

