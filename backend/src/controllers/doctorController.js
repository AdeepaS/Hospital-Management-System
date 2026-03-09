const doctorService = require('../services/doctorService');

// @desc    Get all doctors with pagination, search, and filters
// @route   GET /api/doctors
// @access  Public (for appointment booking) / Admin (for management)
exports.getDoctors = async (req, res) => {
  try {
    const filters = {
      page: req.query.page,
      limit: req.query.limit,
      search: req.query.search,
      specialization: req.query.specialization,
      status: req.query.status,
      date: req.query.date
    };

    const result = await doctorService.getDoctors(filters);
    res.json(result);

  } catch (error) {
    console.error('Get doctors error:', error);
    res.status(500).json({ message: error.message || 'Server error' });
  }
};

// @desc    Get doctor by ID with detailed information
// @route   GET /api/doctors/:id
// @access  Public
exports.getDoctorById = async (req, res) => {
  try {
    const result = await doctorService.getDoctorById(req.params.id);
    res.json(result);

  } catch (error) {
    console.error('Get doctor by ID error:', error);
    if (error.message === 'Doctor not found') {
      return res.status(404).json({ message: error.message });
    }
    res.status(500).json({ message: error.message || 'Server error' });
  }
};

// @desc    Create a new doctor
// @route   POST /api/doctors
// @access  Private (Admin only)
exports.createDoctor = async (req, res) => {
  try {
    const doctor = await doctorService.createDoctor(req.body);
    res.status(201).json(doctor);

  } catch (error) {
    console.error('Create doctor error:', error);
    if (error.message === 'Doctor with this email already exists') {
      return res.status(400).json({ message: error.message });
    }
    res.status(500).json({ message: error.message || 'Server error' });
  }
};

// @desc    Update doctor information
// @route   PUT /api/doctors/:id
// @access  Private (Admin only)
exports.updateDoctor = async (req, res) => {
  try {
    const doctor = await doctorService.updateDoctor(req.params.id, req.body);
    res.json(doctor);

  } catch (error) {
    console.error('Update doctor error:', error);
    if (error.message === 'Doctor not found') {
      return res.status(404).json({ message: error.message });
    }
    if (error.message === 'Doctor with this email already exists') {
      return res.status(400).json({ message: error.message });
    }
    res.status(500).json({ message: error.message || 'Server error' });
  }
};

// @desc    Update doctor status
// @route   PATCH /api/doctors/:id/status
// @access  Private (Admin only)
exports.updateDoctorStatus = async (req, res) => {
  try {
    const { status } = req.body;
    
    if (!status) {
      return res.status(400).json({ message: 'Status is required' });
    }

    const doctor = await doctorService.updateDoctorStatus(req.params.id, status);
    res.json(doctor);

  } catch (error) {
    console.error('Update doctor status error:', error);
    if (error.message === 'Doctor not found') {
      return res.status(404).json({ message: error.message });
    }
    if (error.message === 'Invalid status value') {
      return res.status(400).json({ message: error.message });
    }
    res.status(500).json({ message: error.message || 'Server error' });
  }
};

// @desc    Delete doctor (soft delete)
// @route   DELETE /api/doctors/:id
// @access  Private (Admin only)
exports.deleteDoctor = async (req, res) => {
  try {
    await doctorService.deleteDoctor(req.params.id);
    res.json({ message: 'Doctor deactivated successfully' });

  } catch (error) {
    console.error('Delete doctor error:', error);
    if (error.message === 'Doctor not found') {
      return res.status(404).json({ message: error.message });
    }
    res.status(500).json({ message: error.message || 'Server error' });
  }
};

// @desc    Get doctor's appointments
// @route   GET /api/doctors/:id/appointments
// @access  Private (Admin only)
exports.getDoctorAppointments = async (req, res) => {
  try {
    const filters = {
      page: req.query.page,
      limit: req.query.limit,
      status: req.query.status,
      startDate: req.query.startDate,
      endDate: req.query.endDate
    };

    const result = await doctorService.getDoctorAppointments(req.params.id, filters);
    res.json(result);

  } catch (error) {
    console.error('Get doctor appointments error:', error);
    res.status(500).json({ message: error.message || 'Server error' });
  }
};

// @desc    Get all unique specializations
// @route   GET /api/doctors/specializations/list
// @access  Public
exports.getSpecializations = async (req, res) => {
  try {
    const specializations = await doctorService.getSpecializations();
    res.json(specializations);

  } catch (error) {
    console.error('Get specializations error:', error);
    res.status(500).json({ message: error.message || 'Server error' });
  }
};


