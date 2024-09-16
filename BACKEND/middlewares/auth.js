import { catchAsyncErrors } from "./catchAsynErrors.js";
import ErrorHandler from './error.js';  // Ensure ErrorHandler is correctly imported
import { User } from './../models/userSchema.js';  // Ensure the User model is correctly imported
import jwt from "jsonwebtoken";

// Middleware to check if the admin is authenticated
export const isAdminAuthenticated = catchAsyncErrors(async (req, res, next) => {
    const token = req.cookies.adminToken;
    if (!token) {
        return next(new ErrorHandler("Admin not authenticated", 401));
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = await User.findById(decoded.id); // Ensure the User model is correctly imported
    if (req.user.role !== "Admin") {
        return next(new ErrorHandler(`${req.user.role} is not authorized for this role`, 403));
    }

    next();
});

// Middleware to check if the patient is authenticated
export const isPatientAuthenticated = catchAsyncErrors(async (req, res, next) => {
    const token = req.cookies.patientToken;
    if (!token) {
    
        return next(new ErrorHandler("Token Patient not authenticated", 401));
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = await User.findById(decoded.id);
    if (req.user.role !== "Patient") {
        return next(new ErrorHandler(`${req.user.role} is not authorized for this role`, 403));
    }

    next();
});