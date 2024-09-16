import mongoose from 'mongoose';
import validator from 'validator';

const messageSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minLength: [3, "First Name must contain at least three characters"]
    },
    lastName: {
        type: String,
        required: true,
        minLength: [3, "Last Name must contain at least three characters"]
    },
    email: {
        type: String,
        required: true,
        validate: [validator.isEmail, "Please provide a valid email"]
    },
    phone: {
        type: String,
        required: true,
        validate: {
            validator: function(value) {
                // Ensure phone number is exactly 10 digits
                return /^[0-9]{10}$/.test(value);
            },
            message: "Phone number must contain exactly 10 digits"
        }
    },
    message: {
        type: String,
        required: true,
        minLength: [5, "Message must contain at least five characters"]
    }
});

export const Message = mongoose.model("Message", messageSchema);
