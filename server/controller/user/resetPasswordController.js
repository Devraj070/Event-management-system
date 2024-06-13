const speakeasy = require('speakeasy');
const otpDatabase = require('../../database/otpDatabase');
const User = require('../../models/User');
const sendPasswordResetEmail = require('../../middleware/resetPasswordMiddleware');

const sendOTP = async (req, res) => {
    const { email } = req.body;

    try {
        // Generate a random OTP
        const otp = speakeasy.totp({
            secret: 'your_secret_key',
            digits: 6,
            step: 300
        });

        // Store OTP in the database
        otpDatabase[email] = otp;

        // Call the middleware function to send the password reset email
        await sendPasswordResetEmail(email, otp);

        // Send success response
        res.status(200).json({ message: 'OTP sent successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error sending OTP' });
    }
};

const verifyOTP = (req, res) => {
    const { email, otp } = req.body;

    try {
        // Get the stored OTP from the database
        const storedOtp = otpDatabase[email];

        // Verify if the entered OTP matches the stored OTP
        if (otp === storedOtp) {
            // If OTP matches, send success response
            res.status(200).json({ message: 'OTP verification successful' });
        } else {
            // If OTP does not match, send error response
            res.status(400).json({ message: 'Invalid OTP' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error verifying OTP' });
    }
};

const bcrypt = require('bcrypt');  // Import bcryptjs (you might need to install it using npm)

const updatePassword = async (req, res) => {
    const { email, newPassword } = req.body;

    try {
        // First, hash the new password
        const salt = await bcrypt.genSalt(10); // Generate salt, 10 rounds is generally enough
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        // Find the user by email and update the password with the hashed password
        const updatedUser = await User.findOneAndUpdate(
            { email },
            { password: hashedPassword },
            { new: true }
        );

        if (!updatedUser) {
            // If user with the given email is not found
            res.status(404).json({ message: 'User not found' });
        }

        // Send success response
        res.status(200).json({ message: 'Password updated successfully' });
    } catch (error) {
        console.error('Error updating password:', error);
        res.status(500).json({ message: 'Error updating password' });
    }
};

module.exports = { sendOTP, verifyOTP, updatePassword };
