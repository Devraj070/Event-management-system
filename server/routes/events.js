const express = require('express');
const router = express.Router();
const Event = require('../models/Event');
const Booking = require('../models/Booking'); // Ensure the path to Booking model is correct

// Create an event
router.post('/create', async (req, res) => {
    const { title, description, date, time, location, ticketPrice, privacySetting, userId, owner } = req.body;

    if (!userId || !owner) {
        return res.status(400).json({ message: 'User ID or owner name is required' });
    }

    const newEvent = new Event({ title, description, date, time, location, ticketPrice, privacySetting, userId, owner });

    try {
        const event = await newEvent.save();
        res.json(event);
    } catch (err) {
        console.error('Error creating event:', err);
        res.status(500).send(err.message);
    }
});

// Get all events
router.get('/', async (req, res) => {
    try {
        const events = await Event.find();
        res.json(events);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Get event by ID
router.get('/:id', async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }
        res.json(event);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Update event by ID
router.put('/:id', async (req, res) => {
    const { title, description, date, time, location, ticketPrice, privacySetting } = req.body;

    try {
        const event = await Event.findByIdAndUpdate(
            req.params.id,
            { title, description, date, time, location, ticketPrice, privacySetting },
            { new: true }
        );
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }
        res.json(event);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Get events for a specific user with booking counts
router.get('/user/:userId', async (req, res) => {
    try {
        const events = await Event.find({ userId: req.params.userId });
        const eventIds = events.map(event => event._id);

        const bookingCounts = await Booking.aggregate([
            { $match: { eventId: { $in: eventIds } } },
            { $group: { _id: '$eventId', count: { $sum: 1 } } }
        ]);

        const eventsWithBookingCounts = events.map(event => {
            const bookingCount = bookingCounts.find(count => count._id.equals(event._id));
            return { ...event.toObject(), bookingsCount: bookingCount ? bookingCount.count : 0 };
        });

        res.json(eventsWithBookingCounts);
    } catch (err) {
        console.error('Error fetching events:', err);
        res.status(500).send(err.message);
    }
});

// Delete event by ID
router.delete('/:id', async (req, res) => {
    try {
        const event = await Event.findByIdAndDelete(req.params.id);
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }

        // Delete all bookings associated with this event
        await Booking.deleteMany({ eventId: event._id });

        res.json({ message: 'Event and associated bookings deleted successfully' });
    } catch (err) {
        console.error('Error deleting event:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;
