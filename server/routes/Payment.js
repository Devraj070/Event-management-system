const express = require('express');
const router = express.Router();
const stripe = require('stripe')('your-stripe-test-secret-key'); // Use your test secret key here
const Booking = require('../models/Booking');

// Endpoint to create a payment intent
router.post('/create-payment-intent', async (req, res) => {
    const { amount } = req.body;

    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency: 'inr',
        });

        res.send({
            clientSecret: paymentIntent.client_secret,
        });
    } catch (error) {
        res.status(500).json({ message: 'Error creating payment intent' });
    }
});

module.exports = router;
