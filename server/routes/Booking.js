const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking'); // Make sure this path is correct
const Event = require('../models/Event'); // Make sure this path is correct

// Book an event
router.post('/', async (req, res) => {
    const { eventId, userId } = req.body;

    if (!eventId || !userId) {
        return res.status(400).json({ message: 'Event ID and User ID are required' });
    }

    try {
        const existingBooking = await Booking.findOne({ eventId, userId });
        if (existingBooking) {
            return res.status(400).json({ message: 'You have already booked this event' });
        }

        const newBooking = new Booking({ eventId, userId });
        await newBooking.save();
        res.status(201).json({ message: 'Booking successful' });
    } catch (error) {
        console.error('Error booking event:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Get booked events by user ID
router.get('/user/:userId', async (req, res) => {
    const { userId } = req.params;

    try {
        const bookings = await Booking.find({ userId }).populate('eventId');
        const bookedEvents = bookings.map(booking => booking.eventId);
        res.status(200).json(bookedEvents);
    } catch (error) {
        console.error('Error fetching booked events:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;
