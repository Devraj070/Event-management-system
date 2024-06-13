const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');


router.post('/api/contact', async (req, res) => {
    const { name, email, phone, subject, message } = req.body;

    try {
        const newContact = new Contact({
            name,
            email,
            phone,
            subject,
            message,
        });

        await newContact.save();

        res.status(201).json({ message: 'Contact form submitted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error submitting contact form' });
    }
});


module.exports = router;