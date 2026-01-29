import pkg from 'joi'
import mongoose from "mongoose";

const alertSchema = new mongoose.Schema({
    country: {
        type: String,
        required: true,
        trim: true,
        minlength: 2,
        maxlength: 60
    },
    city: {
        type: String,
        require: true,
        trim: true,
        minlength: 2,
        maxlength: 100
    },
    visaType: {
        type: String,
        required: true,
        enum: ['Tourist', 'Business', 'Student']
    },
    status: {
        type: String,
        enum: ['Active', 'Booked', 'Expired'],
        default: 'Active'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

export default mongoose.model('Alert', alertSchema);