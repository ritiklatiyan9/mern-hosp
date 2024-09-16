import { catchAsyncErrors } from "../middlewares/catchAsynErrors.js";
import ErrorHandler from "../middlewares/error.js";
import { Appointment } from "../models/appointmentSchema.js";
import { User } from "../models/userSchema.js";

export const postAppointment = catchAsyncErrors(async (req, res, next) => {
  const {
    firstName,
    lastName,
    email,
    phone,
    nic,
    dob,
    gender,
    appointment_date, // Corrected field name
    department,
    doctor_firstName,
    doctor_lastName,
    hasVisited,
    address,
    status,
  } = req.body;

  // Check if all fields are provided
  if (
    !firstName ||
    !lastName ||
    !email ||
    !phone ||
    !nic ||
    !dob ||
    !gender ||
    !appointment_date || // Corrected field name
    !department ||
    !doctor_firstName ||
    !doctor_lastName ||
    !address ||
    !status
  ) {
    return next(new ErrorHandler("Please fill all the fields", 400));
  }

  // Find the doctor by firstName, lastName, and department
  const isConflict = await User.find({
    firstName: doctor_firstName,
    lastName: doctor_lastName,
    role: "Doctor",
    doctorDepartment: department,
  });

  if (isConflict.length === 0) {
    return next(new ErrorHandler("Doctor not Found", 400));
  }
  if (isConflict.length > 1) {
    return next(
      new ErrorHandler(
        "Doctors Conflict! Please Contact through Phone or Email",
        400
      )
    );
  }

  const doctorId = isConflict[0]._id;
  const patientId = req.user._id; // Ensure req.user is populated correctly

  // Create a new appointment
  const appointment = await Appointment.create({
    firstName,
    lastName,
    email,
    phone,
    nic,
    dob,
    gender,
    appointment_date, // Corrected field name
    department,
    doctor: {
      firstName: doctor_firstName,
      lastName: doctor_lastName,
    },
    doctorId,
    patientId,
    address,
    hasVisited,
    status,
  });

  res.status(200).json({
    success: true,
    message: "Appointment Booked successfully",
    appointment,
  });
});

export const getAppointments = catchAsyncErrors(async (req, res, next) => {
  const appointments = await Appointment.find();
  res.status(200).json({
    success: true,
    appointments,
  });
});

export const updateAppointmentStatus = catchAsyncErrors(
  async (req, res, next) => {
    const { id } = req.params;

    // Find the appointment by ID
    const appointment = await Appointment.findById(id);

    if (!appointment) {
      return next(new ErrorHandler("Appointment Not Found", 404));
    }

    // Update the appointment with the provided data
    const updatedAppointment = await Appointment.findByIdAndUpdate(
      id,
      req.body,
      {
        new: true,
        runValidators: true,
        useFindAndModify: false,
      }
    );

    res.status(200).json({
      success: true,
      message: "Appointment Updated successfully",
      appointment: updatedAppointment,
    });
  }
);

export const deleteAppointment = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  let appointment = await Appointment.findById(id);
  if (!appointment) {
    return next(new ErrorHandler("Appointment Not Found", 404));
  }
  appointment = await Appointment.findByIdAndDelete(id);

  res.status(200).json({
    success: true,
    message: "Appointment Deleted successfully",
    appointment,
  });
});

export const getMyAppointments = catchAsyncErrors(async (req, res, next) => {
  const appointments = await Appointment.find({ patientId: req.user._id });
  res.status(200).json({
    success: true,
    appointments,
  });
});
