import mongoose from 'mongoose';
import validator from 'validator';

const appointmentSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    minLength: [3, 'First Name must contain at least three characters'],
  },
  lastName: {
    type: String,
    required: true,
    minLength: [3, 'Last Name must contain at least three characters'],
  },
  email: {
    type: String,
    required: true,
    validate: [validator.isEmail, 'Please provide a valid email'],
    unique: true,
  },
  phone: {
    type: String,
    required: true,
    minLength: [10, 'Please enter your 10-digit number'],
    maxLength: [10, 'Please enter your 10-digit number'],
  },
  nic: {
    type: String,
    required: true,
    minLength: [12, 'NIC must contain exactly 12 characters'],
    maxLength: [12, 'NIC must contain exactly 12 characters'],
  },
  dob: {
    type: Date,
    required: [true, 'DOB is required'],
  },
  gender: {
    type: String,
    required: true,
    enum: ['Male', 'Female'],
  },
  appointment_date: { // Fixed spelling
    type: Date,
    required: true,
  },
  appointment_time:{
    type: String,
    
  },
  department: {
    type: String,
    required: true,
  },
  doctor: {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
  },
  doctorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  hasVisited: {
    type: Boolean,
    default: false,
  },
  status: {
    type: String,
    enum: ['Pending', 'Approved', 'Rejected'],
    default: 'Pending',
  },
}, { timestamps: true });

export const Appointment = mongoose.model('Appointment', appointmentSchema);
