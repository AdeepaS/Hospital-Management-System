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
