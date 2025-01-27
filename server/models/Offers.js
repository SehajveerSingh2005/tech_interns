const mongoose = require('mongoose');

const offerSchema = new mongoose.Schema({
    role: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    company: {
        type: String,
        required: true,
    },
    department: {
        type: String,
        required: true,
    },
    requirements: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    stipend: {
        type: String,
        required: true,
    },
    duration: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
        enum: ['Full-time', 'Part-time'],
    },
    posted: {
        type: Date,
        default: Date.now,
    },
    deadline: {
        type: Date,
        required: true,
    },
    status: {
        type: String,
        required: true,
        enum: ['active', 'closed'],
    },
    });

const Offers = mongoose.model('Offers', offerSchema);

module.exports = Offers;