import React, { useState } from 'react';
import { toast } from 'react-hot-toast';

const PaymentModal = ({ eventId, ticketPrice, onClose, onSuccess }) => {
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();
        setIsLoading(true);

        // Simulate a delay for payment processing
        setTimeout(() => {
            setIsLoading(false);
            toast.success('Payment successful and booking confirmed!');
            onSuccess(eventId);
            onClose();
        }, 2000); // Simulate a 2-second delay
    };

    return (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center">
            <div className="bg-white rounded-lg p-6 w-96">
                <h2 className="text-2xl mb-4">Payment Information</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">Card Number</label>
                        <input
                            type="text"
                            placeholder="1234 5678 9101 1121"
                            className="py-2 px-4 border rounded-md w-full text-black"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">Expiry Date</label>
                        <input
                            type="text"
                            placeholder="MM/YY"
                            className="py-2 px-4 border rounded-md w-full text-black"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">CVC</label>
                        <input
                            type="text"
                            placeholder="123"
                            className="py-2 px-4 border rounded-md w-full text-black"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-indigo-500 text-white py-2 rounded-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600"
                        disabled={isLoading}
                    >
                        {isLoading ? 'Processing...' : 'Pay'}
                    </button>
                </form>
                <button
                    onClick={onClose}
                    className="mt-4 w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600 focus:outline-none focus:bg-red-600"
                >
                    Cancel
                </button>
            </div>
        </div>
    );
};

export default PaymentModal;
