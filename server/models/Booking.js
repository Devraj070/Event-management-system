const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
    eventId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event',
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

// Create a unique index to prevent duplicate bookings for the same event by the same user
BookingSchema.index({ eventId: 1, userId: 1 }, { unique: true });

const Booking = mongoose.model('Booking', BookingSchema);

module.exports = Booking;
