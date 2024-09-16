class ErrorHandler extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
    }
}

export const errorMiddleware = (err, req, res, next) => {
    let error = { ...err }; // Create a new variable to handle the modified error object
    error.message = err.message || "Internal Server Error";
    error.statusCode = err.statusCode || 500;

    // Check if duplicate key error
    if (err.code === 11000) {
        const message = `Duplicate ${Object.keys(err.keyValue)} Entered`;
        error = new ErrorHandler(message, 400); // Assign the new error object
    }

    // Handle invalid JWT error
    if (err.name === "JsonWebTokenError") {
        const message = "JSON web token is invalid, try again";
        error = new ErrorHandler(message, 400); // Assign the new error object
    }

    // Handle expired JWT error
    if (err.name === "TokenExpiredError") {
        const message = "JSON web token is expired, try again";
        error = new ErrorHandler(message, 400); // Assign the new error object
    }

    // Handle cast errors (e.g., invalid ObjectId)
    if (err.name === "CastError") {
        const message = `Invalid ${err.path}`;
        error = new ErrorHandler(message, 400); // Assign the new error object
    }

    const errorMessage = error.errors
        ? Object.values(error.errors).map((e) => e.message).join(" ")
        : error.message;

    return res.status(error.statusCode).json({
        success: false,
        message: errorMessage,
    });
};

export default ErrorHandler;