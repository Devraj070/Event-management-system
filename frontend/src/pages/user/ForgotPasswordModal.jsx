import React, { useState, useEffect } from 'react';
import { Toaster, toast } from 'react-hot-toast';





const ForgotPasswordModal = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [otpVerified, setOtpVerified] = useState(false);



  // Reset all states when the modal is opened
  useEffect(() => {
    if (isOpen) {
      setEmail('');
      setOtp('');
      setNewPassword('');
      setOtpVerified(false);
      setError(null);
      setSuccessMessage('');
    }
  }, [isOpen]);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleOtpChange = (event) => {
    setOtp(event.target.value);
  };

  const handleNewPasswordChange = (event) => {
    setNewPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccessMessage('');

    try {
      const response = await fetch('https://event-management-system-pyg9.onrender.com/api/users/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email })
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage || 'Reset password failed');
      }

      setSuccessMessage('Password reset email sent successfully');
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('https://event-management-system-pyg9.onrender.com/api/users/verify-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, otp })
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage || 'OTP verification failed');
      }

      setOtpVerified(true);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdatePassword = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('https://event-management-system-pyg9.onrender.com/api/users/update-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, newPassword })
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage || 'Password update failed');
      }

      toast.success('Password updated successfully');
      setOtpVerified(false);
      onClose(); // Close the modal after updating password

    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Toaster />
      {isOpen && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white w-full max-w-md mx-auto rounded-lg shadow-lg overflow-hidden z-50">
            <div className="px-6 py-4">
              <div className="flex justify-between items-center pb-3">
                <h2 className="text-xl font-bold text-black">Forgot Password</h2>
                <button className="text-gray-600 hover:text-gray-800 focus:outline-none" onClick={onClose}>
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </button>
              </div>
              {successMessage && !otpVerified && (
                <>
                  <p className="text-green-500 mt-2">{successMessage}</p>
                  <div className="mt-4">
                    <label htmlFor="otp" className="block text-gray-700 text-sm font-bold mb-2">Enter OTP</label>
                    <input
                      type="text"
                      id="otp"
                      name="otp"
                      value={otp}
                      onChange={handleOtpChange}
                      required
                      className="block w-full px-4 py-2 text-gray-700 bg-gray-200 rounded-lg focus:outline-none focus:bg-white focus:shadow-inner"
                    />
                  </div>
                  <div className="mt-4">
                    <button
                      type="button"
                      onClick={handleVerifyOtp}
                      className="w-full px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                    >
                      Verify OTP
                    </button>
                  </div>
                </>
              )}
              {error && <p className="text-red-500 mt-2">{error}</p>}
              {!successMessage && !otpVerified && (
                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={email}
                      onChange={handleEmailChange}
                      required
                      className="block w-full px-4 py-2 text-gray-700 bg-gray-200 rounded-lg focus:outline-none focus:bg-white focus:shadow-inner"
                    />
                  </div>
                  {isLoading ? (
                    <button
                      type="button"
                      className="w-full px-4 py-2 text-white bg-gray-400 rounded-lg cursor-not-allowed focus:outline-none"
                      disabled
                    >
                      Loading...
                    </button>
                  ) : (
                    <button
                      type="submit"
                      className="w-full px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                    >
                      Reset Password
                    </button>
                  )}
                </form>
              )}
              {otpVerified && (
                <form onSubmit={handleUpdatePassword}>
                  <div className="mt-4">
                    <label htmlFor="newPassword" className="block text-gray-700 text-sm font-bold mb-2">New Password</label>
                    <input
                      type="password"
                      id="newPassword"
                      name="newPassword"
                      value={newPassword}
                      onChange={handleNewPasswordChange}
                      required
                      className="block w-full px-4 py-2 text-gray-700 bg-gray-200 rounded-lg focus:outline-none focus:bg-white focus:shadow-inner"
                    />
                  </div>
                  <div className="mt-4">
                    <button
                      type="submit"
                      className="w-full px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                    >
                      Update Password
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ForgotPasswordModal;
