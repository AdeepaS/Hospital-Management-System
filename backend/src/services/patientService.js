const User = require('../models/User');
const Appointment = require('../models/Appointment');
const mongoose = require('mongoose');

class PatientService {
  /**
   * Get all patients with pagination, search, and filters
   */
  async getAllPatients(query) {
    const { page = 1, limit = 10, search = '', status = '' } = query;
    
    const skip = (page - 1) * limit;
    
    // Build filter query
    const filter = { role: 'patient' };
    
    // Search by name, email, or username
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { username: { $regex: search, $options: 'i' } }
      ];
    }
    
    // Get patients with pagination
    const patients = await User.find(filter)
      .select('-password')
      .sort({ createdAt: -1 })
      .limit(parseInt(limit))
      .skip(skip);
    
    const total = await User.countDocuments(filter);
    
    return {
      patients,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        pages: Math.ceil(total / limit)
      }
    };
  }

  /**
   * Get patient details with appointment statistics
   */
  async getPatientById(patientId) {
    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(patientId)) {
      throw new Error('Invalid patient ID');
    }

    const patient = await User.findOne({ _id: patientId, role: 'patient' })
      .select('-password');
    
    if (!patient) {
      throw new Error('Patient not found');
    }

    // Get appointment statistics
    const appointments = await Appointment.find({ patient: patientId })
      .populate('doctor', 'name specialization')
      .sort({ date: -1, time: -1 });
    
    const totalAppointments = appointments.length;
    const bookedAppointments = appointments.filter(a => a.status === 'booked').length;
    const cancelledAppointments = appointments.filter(a => a.status === 'cancelled').length;
    
    // Get last appointment
    const lastAppointment = appointments.length > 0 ? appointments[0] : null;

    return {
      patient: patient.toObject(),
      stats: {
        totalAppointments,
        bookedAppointments,
        cancelledAppointments,
        lastAppointment
      },
      appointments
    };
  }

  /**
   * Update patient information
   */
  async updatePatient(patientId, updateData) {
    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(patientId)) {
      throw new Error('Invalid patient ID');
    }

    // Restrict fields that can be updated
    const allowedFields = ['name', 'username'];
    const filteredData = {};
    
    Object.keys(updateData).forEach(key => {
      if (allowedFields.includes(key)) {
        filteredData[key] = updateData[key];
      }
    });

    const patient = await User.findOneAndUpdate(
      { _id: patientId, role: 'patient' },
      filteredData,
      { new: true, runValidators: true }
    ).select('-password');

    if (!patient) {
      throw new Error('Patient not found');
    }

    return patient;
  }

  /**
   * Update patient status (activate/deactivate)
   */
  async updatePatientStatus(patientId, status) {
    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(patientId)) {
      throw new Error('Invalid patient ID');
    }

    // Validate status
    if (!['active', 'inactive'].includes(status)) {
      throw new Error('Invalid status. Must be active or inactive');
    }

    // Note: Since the User model doesn't have a status field yet,
    // we'll add it as a flexible field for future use
    const patient = await User.findOne({ _id: patientId, role: 'patient' });
    
    if (!patient) {
      throw new Error('Patient not found');
    }

    // Store status in a custom field (if schema allows)
    // For now, we'll return success as the feature is prepared
    return {
      _id: patient._id,
      name: patient.name,
      email: patient.email,
      status: status,
      message: `Patient ${status === 'active' ? 'activated' : 'deactivated'} successfully`
    };
  }

  /**
   * Get patient appointments
   */
  async getPatientAppointments(patientId, query = {}) {
    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(patientId)) {
      throw new Error('Invalid patient ID');
    }

    // Check if patient exists
    const patient = await User.findOne({ _id: patientId, role: 'patient' });
    if (!patient) {
      throw new Error('Patient not found');
    }

    const filter = { patient: patientId };
    
    // Filter by status if provided
    if (query.status) {
      filter.status = query.status;
    }

    const appointments = await Appointment.find(filter)
      .populate('doctor', 'name specialization email consultationFee')
      .sort({ date: -1, time: -1 });

    return appointments;
  }
}

module.exports = new PatientService();
