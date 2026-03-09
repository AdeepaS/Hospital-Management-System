const Doctor = require('../models/Doctor');
const Appointment = require('../models/Appointment');

/**
 * Get all doctors with pagination, search, and filters
 */
exports.getDoctors = async (filters) => {
  const {
    page = 1,
    limit = 10,
    search = '',
    specialization = '',
    status = '',
    date = ''
  } = filters;

  // Build query
  const query = {};

  // Search by name or email
  if (search) {
    query.$or = [
      { name: { $regex: search, $options: 'i' } },
      { email: { $regex: search, $options: 'i' } }
    ];
  }

  // Filter by specialization
  if (specialization) {
    query.specialization = specialization;
  }

  // Filter by status
  if (status) {
    query.status = status;
  }

  // Calculate pagination
  const skip = (page - 1) * limit;

  // Execute query
  const doctors = await Doctor.find(query)
    .select('-__v')
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(parseInt(limit));

  const total = await Doctor.countDocuments(query);

  // If date is provided, filter by workingDays and include booked slots
  let doctorsWithSlots = doctors;
  if (date) {
    const dayName = new Date(date).toLocaleDateString('en-US', { weekday: 'long' });
    
    // Filter doctors who work on that day
    doctorsWithSlots = doctors.filter(doctor => 
      doctor.workingDays.includes(dayName)
    );

    // Fetch booked slots
    const doctorIds = doctorsWithSlots.map(doc => doc._id);
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
    doctorsWithSlots = doctorsWithSlots.map(doctor => {
      const docObj = doctor.toObject();
      docObj.bookedSlots = bookedSlotsByDoctor[doctor._id.toString()] || [];
      return docObj;
    });
  }

  return {
    doctors: doctorsWithSlots,
    pagination: {
      page: parseInt(page),
      limit: parseInt(limit),
      total,
      pages: Math.ceil(total / limit)
    }
  };
};

/**
 * Get doctor by ID with detailed information
 */
exports.getDoctorById = async (doctorId) => {
  const doctor = await Doctor.findById(doctorId).select('-__v');

  if (!doctor) {
    throw new Error('Doctor not found');
  }

  // Get appointment statistics
  const totalAppointments = await Appointment.countDocuments({ doctor: doctorId });
  const completedAppointments = await Appointment.countDocuments({ 
    doctor: doctorId, 
    status: 'completed' 
  });
  const pendingAppointments = await Appointment.countDocuments({ 
    doctor: doctorId, 
    status: 'booked' 
  });
  const cancelledAppointments = await Appointment.countDocuments({ 
    doctor: doctorId, 
    status: 'cancelled' 
  });

  return {
    doctor,
    stats: {
      totalAppointments,
      completedAppointments,
      pendingAppointments,
      cancelledAppointments
    }
  };
};

/**
 * Create a new doctor
 */
exports.createDoctor = async (doctorData) => {
  // Check if doctor with email already exists
  const existingDoctor = await Doctor.findOne({ email: doctorData.email });
  if (existingDoctor) {
    throw new Error('Doctor with this email already exists');
  }

  const doctor = await Doctor.create(doctorData);
  return doctor;
};

/**
 * Update doctor information
 */
exports.updateDoctor = async (doctorId, updateData) => {
  // If email is being updated, check for duplicates
  if (updateData.email) {
    const existingDoctor = await Doctor.findOne({ 
      email: updateData.email,
      _id: { $ne: doctorId }
    });
    if (existingDoctor) {
      throw new Error('Doctor with this email already exists');
    }
  }

  const doctor = await Doctor.findByIdAndUpdate(
    doctorId,
    updateData,
    { new: true, runValidators: true }
  ).select('-__v');

  if (!doctor) {
    throw new Error('Doctor not found');
  }

  return doctor;
};

/**
 * Update doctor status
 */
exports.updateDoctorStatus = async (doctorId, status) => {
  const validStatuses = ['active', 'inactive', 'on_leave'];
  
  if (!validStatuses.includes(status)) {
    throw new Error('Invalid status value');
  }

  const doctor = await Doctor.findByIdAndUpdate(
    doctorId,
    { status },
    { new: true, runValidators: true }
  ).select('-__v');

  if (!doctor) {
    throw new Error('Doctor not found');
  }

  return doctor;
};

/**
 * Delete doctor (soft delete by setting status to inactive)
 */
exports.deleteDoctor = async (doctorId) => {
  const doctor = await Doctor.findByIdAndUpdate(
    doctorId,
    { status: 'inactive' },
    { new: true }
  );

  if (!doctor) {
    throw new Error('Doctor not found');
  }

  return doctor;
};

/**
 * Get doctor's appointments
 */
exports.getDoctorAppointments = async (doctorId, filters) => {
  const {
    page = 1,
    limit = 10,
    status = '',
    startDate = '',
    endDate = ''
  } = filters;

  // Build query
  const query = { doctor: doctorId };

  if (status) {
    query.status = status;
  }

  if (startDate && endDate) {
    query.date = {
      $gte: startDate,
      $lte: endDate
    };
  }

  // Calculate pagination
  const skip = (page - 1) * limit;

  // Execute query
  const appointments = await Appointment.find(query)
    .populate('patient', 'name email phone')
    .populate('doctor', 'name specialization')
    .sort({ date: -1, time: -1 })
    .skip(skip)
    .limit(parseInt(limit));

  const total = await Appointment.countDocuments(query);

  return {
    appointments,
    pagination: {
      page: parseInt(page),
      limit: parseInt(limit),
      total,
      pages: Math.ceil(total / limit)
    }
  };
};

/**
 * Get all unique specializations
 */
exports.getSpecializations = async () => {
  const specializations = await Doctor.distinct('specialization');
  return specializations.filter(s => s); // Remove null/empty values
};
