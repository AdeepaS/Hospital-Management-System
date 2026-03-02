const express = require('express');
const router = express.Router();
const { getDoctors, createDoctor } = require('../controllers/doctorController');
const { protect, authorize } = require('../middleware/authMiddlewae');

// GET /api/doctors?specialization=...&date=...
router.get('/', getDoctors);

// POST /api/doctors (protected, admin only)
router.post('/', protect, authorize('admin'), createDoctor);

module.exports = router;
