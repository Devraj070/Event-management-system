// resetPasswordMiddleware.js

const nodemailer = require('nodemailer');
const speakeasy = require('speakeasy');
require('dotenv').config(); // Load environment variables

const sendPasswordResetEmail = async (email, otp) => {
    // Create transporter for sending emails
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD
        }
    });

    // Define email options
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Password Reset OTP',
        text: `Your OTP for password reset is: ${otp}`
    };

    // Send email with OTP
    await transporter.sendMail(mailOptions);
};

module.exports = sendPasswordResetEmail;
