// routes/search.js

const express = require('express');
const router = express.Router();
const Event = require('../models/Event');

// Route for searching events
router.get('/', async (req, res) => {
    try {
        const { query } = req.query;
        if (!query) {
            return res.status(400).json({ success: false, error: 'Query parameter is required.' });
        }

        const numberQuery = parseFloat(query);
        const dateQuery = new Date(query);

        const isValidDate = !isNaN(dateQuery.valueOf());

        // Use regex to perform a case-insensitive search on string fields and handle number/date fields appropriately.

        const searchConditions = [
            { title: { $regex: new RegExp(query, 'i') } },
            { description: { $regex: new RegExp(query, 'i') } },
            { time: { $regex: new RegExp(query, 'i') } },
            { location: { $regex: new RegExp(query, 'i') } },
            { privacySetting: { $regex: new RegExp(query, 'i') } },
            { owner: { $regex: new RegExp(query, 'i') } },

        ];

        if (!isNaN(numberQuery)) {
            searchConditions.push({ ticketPrice: numberQuery });
        }

        if (isValidDate) {
            searchConditions.push({ date: dateQuery });
        }

        const searchResults = await Event.find({
            $or: searchConditions
        });

        res.json({ success: true, data: searchResults });
    } catch (error) {
        console.error('Error searching events:', error);
        res.status(500).json({ success: false, error: 'An error occurred while searching for events.' });
    }
});

module.exports = router;
