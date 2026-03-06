const express = require('express');
const router = express.Router();
const {
  getAllPatients,
  getPatientById,
  updatePatient,
  updatePatientStatus,
  getPatientAppointments
} = require('../controllers/patientController');
const { protect, authorize } = require('../middleware/authMiddlewae');

// All routes are protected and admin-only
router.use(protect, authorize('admin'));

// GET /api/patients - Get all patients with pagination and search
router.get('/', getAllPatients);

// GET /api/patients/:id - Get patient details
router.get('/:id', getPatientById);

// PUT /api/patients/:id - Update patient information
router.put('/:id', updatePatient);

// PATCH /api/patients/:id/status - Update patient status (activate/deactivate)
router.patch('/:id/status', updatePatientStatus);

// GET /api/patients/:id/appointments - Get patient appointments
router.get('/:id/appointments', getPatientAppointments);

module.exports = router;
