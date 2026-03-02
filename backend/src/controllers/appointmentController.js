const Appointment = require('../models/Appointment');
const Doctor = require('../models/Doctor');

// @desc    Create a new appointment
// @route   POST /api/appointments
// @access  Private (Patient only)
exports.createAppointment = async (req, res) => {
  try {
    const { doctorId, date, time } = req.body;

    // Validate required fields
    if (!doctorId || !date || !time) {
      return res.status(400).json({ 
        message: 'Please provide doctorId, date, and time' 
      });
    }

    // Verify doctor exists
    const doctor = await Doctor.findById(doctorId);
    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }

    // Verify doctor works on that day
    const dayName = new Date(date).toLocaleDateString('en-US', { weekday: 'long' });
    if (!doctor.workingDays.includes(dayName)) {
      return res.status(400).json({ 
        message: `Doctor does not work on ${dayName}` 
      });
    }

    // Create appointment
    const appointment = await Appointment.create({
      patient: req.user._id,
      doctor: doctorId,
      date,
      time,
      status: 'booked'
    });

    // Populate doctor and patient info
    const populatedAppointment = await Appointment.findById(appointment._id)
      .populate('doctor', 'name specialization consultationFee')
      .populate('patient', 'name username email role');

    res.status(201).json(populatedAppointment);

  } catch (error) {
    console.error('Create appointment error:', error);

    // Handle duplicate key error (slot already booked)
    if (error.code === 11000) {
      return res.status(409).json({ 
        message: 'Slot already booked. Please choose another time.' 
      });
    }

    res.status(500).json({ message: error.message || 'Server error' });
  }
};

// @desc    Get my appointments (patient or doctor)
// @route   GET /api/appointments/my
// @access  Private (Patient or Doctor)
exports.getMyAppointments = async (req, res) => {
  try {
    const { role, _id } = req.user;

    let query = {};

    if (role === 'patient') {
      query.patient = _id;
    } else if (role === 'doctor') {
      // Find doctor record associated with this user
      const doctor = await Doctor.findOne({ email: req.user.email });
      if (!doctor) {
        return res.status(404).json({ message: 'Doctor profile not found' });
      }
      query.doctor = doctor._id;
    } else {
      return res.status(403).json({ message: 'Access denied' });
    }

    const appointments = await Appointment.find(query)
      .populate('patient', 'name username email')
      .populate('doctor', 'name specialization consultationFee')
      .sort({ date: 1, time: 1 });

    res.json(appointments);

  } catch (error) {
    console.error('Get my appointments error:', error);
    res.status(500).json({ message: error.message || 'Server error' });
  }
};

// @desc    Get all appointments with filters (admin only)
// @route   GET /api/appointments
// @access  Private (Admin only)
exports.getAllAppointments = async (req, res) => {
  try {
    const { date, doctor, status } = req.query;

    let query = {};

    if (date) query.date = date;
    if (doctor) query.doctor = doctor;
    if (status) query.status = status;

    const appointments = await Appointment.find(query)
      .populate('patient', 'name username email')
      .populate('doctor', 'name specialization consultationFee')
      .sort({ date: 1, time: 1 });

    res.json(appointments);

  } catch (error) {
    console.error('Get all appointments error:', error);
    res.status(500).json({ message: error.message || 'Server error' });
  }
};

// @desc    Cancel appointment
// @route   PUT /api/appointments/:id/cancel
// @access  Private (Patient - own, Doctor - own, Admin - any)
exports.cancelAppointment = async (req, res) => {
  try {
    const { id } = req.params;
    const { role, _id } = req.user;

    const appointment = await Appointment.findById(id);

    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    // Check authorization
    if (role === 'patient') {
      if (appointment.patient.toString() !== _id.toString()) {
        return res.status(403).json({ message: 'Not authorized to cancel this appointment' });
      }
    } else if (role === 'doctor') {
      const doctor = await Doctor.findOne({ email: req.user.email });
      if (!doctor || appointment.doctor.toString() !== doctor._id.toString()) {
        return res.status(403).json({ message: 'Not authorized to cancel this appointment' });
      }
    } else if (role !== 'admin') {
      return res.status(403).json({ message: 'Access denied' });
    }

    // Update status to cancelled
    appointment.status = 'cancelled';
    await appointment.save();

    const updatedAppointment = await Appointment.findById(id)
      .populate('patient', 'name username email')
      .populate('doctor', 'name specialization consultationFee');

    res.json(updatedAppointment);

  } catch (error) {
    console.error('Cancel appointment error:', error);
    res.status(500).json({ message: error.message || 'Server error' });
  }
};
