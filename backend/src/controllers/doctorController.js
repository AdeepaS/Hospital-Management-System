const Doctor = require('../models/Doctor');
const Appointment = require('../models/Appointment');

// @desc    Create a new doctor
// @route   POST /api/doctors
// @access  Private (Admin only)
exports.createDoctor = async (req, res) => {
  try {
    const { name, email, specialization, consultationFee, workingDays, workingHours } = req.body;

    // Validate required fields
    if (!name || !email || !specialization || !consultationFee || !workingDays || !workingHours) {
      return res.status(400).json({ 
        message: 'Please provide all required fields: name, email, specialization, consultationFee, workingDays, workingHours' 
      });
    }

    // Check if doctor with email already exists
    const existingDoctor = await Doctor.findOne({ email });
    if (existingDoctor) {
      return res.status(400).json({ message: 'Doctor with this email already exists' });
    }

    // Create doctor
    const doctor = await Doctor.create({
      name,
      email,
      specialization,
      consultationFee,
      workingDays,
      workingHours
    });

    res.status(201).json(doctor);

  } catch (error) {
    console.error('Create doctor error:', error);
    res.status(500).json({ message: error.message || 'Server error' });
  }
};

// @desc    Get doctors with optional filters
// @route   GET /api/doctors
// @access  Public
exports.getDoctors = async (req, res) => {
  try {
    const { specialization, date } = req.query;

    // Build base query
    let query = {};
    
    if (specialization) {
      query.specialization = specialization;
    }

    // Find doctors based on query
    let doctors = await Doctor.find(query).select('-__v');

    // If date is provided, filter by workingDays and include booked slots
    if (date) {
      // Get day name from date (e.g., "Monday")
      const dayName = new Date(date).toLocaleDateString('en-US', { weekday: 'long' });

      // Filter doctors who work on that day
      doctors = doctors.filter(doctor => 
        doctor.workingDays.includes(dayName)
      );

      // Fetch booked slots for each doctor on that date
      const doctorIds = doctors.map(doc => doc._id);
      const bookedAppointments = await Appointment.find({
        doctor: { $in: doctorIds },
        date: date,
        status: 'booked'
      }).select('doctor time');

      // Group booked slots by doctor
      const bookedSlotsByDoctor = {};
      bookedAppointments.forEach(appointment => {
        const doctorId = appointment.doctor.toString();
        if (!bookedSlotsByDoctor[doctorId]) {
          bookedSlotsByDoctor[doctorId] = [];
        }
        bookedSlotsByDoctor[doctorId].push(appointment.time);
      });

      // Add bookedSlots to each doctor
      doctors = doctors.map(doctor => {
        const docObj = doctor.toObject();
        docObj.bookedSlots = bookedSlotsByDoctor[doctor._id.toString()] || [];
        return docObj;
      });
    }

    res.json(doctors);

  } catch (error) {
    console.error('Get doctors error:', error);
    res.status(500).json({ message: error.message || 'Server error' });
  }
};
