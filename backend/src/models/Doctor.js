const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  phone: {
    type: String,
    trim: true
  },
  profilePhoto: {
    type: String,
    default: 'https://via.placeholder.com/150/2563EB/FFFFFF?text=Doctor'
  },
  specialization: {
    type: String,
    required: true,
    trim: true
  },
  department: {
    type: String,
    trim: true
  },
  experienceYears: {
    type: Number,
    min: 0
  },
  licenseNumber: {
    type: String,
    trim: true
  },
  consultationFee: {
    type: Number,
    required: true,
    min: 0
  },
  education: {
    type: String,
    trim: true
  },
  bio: {
    type: String,
    trim: true
  },
  languages: {
    type: [String],
    default: ['English']
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
    default: 4.0
  },
  status: {
    type: String,
    enum: ['active', 'inactive', 'on_leave'],
    default: 'active'
  },
  workingDays: {
    type: [String],
    required: true,
    validate: {
      validator: function(days) {
        const validDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
        return days.every(day => validDays.includes(day));
      },
      message: 'Invalid working day'
    }
  },
  workingHours: {
    start: {
      type: String,
      required: true,
      match: /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/
    },
    end: {
      type: String,
      required: true,
      match: /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/
    }
  }
}, { timestamps: true, collection: 'doctors' });

module.exports = mongoose.model('Doctor', doctorSchema);
