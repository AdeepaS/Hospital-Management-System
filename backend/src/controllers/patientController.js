const patientService = require('../services/patientService');

// @desc    Get all patients with pagination and filters
// @route   GET /api/patients
// @access  Private (Admin only)
exports.getAllPatients = async (req, res) => {
  try {
    const result = await patientService.getAllPatients(req.query);
    res.json(result);
  } catch (error) {
    console.error('Get all patients error:', error);
    res.status(500).json({ message: error.message || 'Server error' });
  }
};

// @desc    Get patient details with appointment statistics
// @route   GET /api/patients/:id
// @access  Private (Admin only)
exports.getPatientById = async (req, res) => {
  try {
    const result = await patientService.getPatientById(req.params.id);
    res.json(result);
  } catch (error) {
    console.error('Get patient by ID error:', error);
    const statusCode = error.message.includes('not found') || error.message.includes('Invalid') ? 404 : 500;
    res.status(statusCode).json({ message: error.message || 'Server error' });
  }
};

// @desc    Update patient information
// @route   PUT /api/patients/:id
// @access  Private (Admin only)
exports.updatePatient = async (req, res) => {
  try {
    const patient = await patientService.updatePatient(req.params.id, req.body);
    res.json(patient);
  } catch (error) {
    console.error('Update patient error:', error);
    const statusCode = error.message.includes('not found') || error.message.includes('Invalid') ? 404 : 500;
    res.status(statusCode).json({ message: error.message || 'Server error' });
  }
};

// @desc    Activate/Deactivate patient
// @route   PATCH /api/patients/:id/status
// @access  Private (Admin only)
exports.updatePatientStatus = async (req, res) => {
  try {
    const { status } = req.body;
    
    if (!status) {
      return res.status(400).json({ message: 'Status is required' });
    }

    const result = await patientService.updatePatientStatus(req.params.id, status);
    res.json(result);
  } catch (error) {
    console.error('Update patient status error:', error);
    const statusCode = error.message.includes('not found') || error.message.includes('Invalid') ? 404 : 400;
    res.status(statusCode).json({ message: error.message || 'Server error' });
  }
};

// @desc    Get patient appointments
// @route   GET /api/patients/:id/appointments
// @access  Private (Admin only)
exports.getPatientAppointments = async (req, res) => {
  try {
    const appointments = await patientService.getPatientAppointments(req.params.id, req.query);
    res.json(appointments);
  } catch (error) {
    console.error('Get patient appointments error:', error);
    const statusCode = error.message.includes('not found') || error.message.includes('Invalid') ? 404 : 500;
    res.status(statusCode).json({ message: error.message || 'Server error' });
  }
};
