// src/components/Feedback.js
import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';
import { Toaster, toast } from 'react-hot-toast'

const Feedback = () => {
    const [feedback, setFeedback] = useState('');
    const [rating, setRating] = useState(0);
    const [submittedFeedbacks, setSubmittedFeedbacks] = useState([]);

    const handleFeedbackChange = (e) => {
        setFeedback(e.target.value);
    };

    const handleRatingChange = (rate) => {
        setRating(rate);
    };

    const handleSubmit = (e) => {
        toast.success("Thanks for your valuable feedback! ")
        e.preventDefault();
        if (feedback.trim()) {
            setSubmittedFeedbacks([...submittedFeedbacks, { feedback, rating }]);
            setFeedback('');
            setRating(0);
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center px-4">
            <h1 className="text-3xl font-bold mb-8 text-white">Event Feedback</h1>
            <form onSubmit={handleSubmit} className="w-full max-w-md bg-white p-6 rounded-md shadow-md">
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="feedback">
                        Your Feedback
                    </label>
                    <textarea
                        id="feedback"
                        value={feedback}
                        onChange={handleFeedbackChange}
                        className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none"
                        rows="4"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Rating
                    </label>
                    <div className="flex">
                        {[...Array(5)].map((_, index) => (
                            <FaStar
                                key={index}
                                className={`cursor-pointer ${index < rating ? 'text-yellow-500' : 'text-gray-400'}`}
                                onClick={() => handleRatingChange(index + 1)}
                            />
                        ))}
                    </div>
                </div>
                <button
                    type="submit"
                    className="w-full bg-indigo-500 text-white py-2 rounded-md hover:bg-indigo-600 focus:outline-none"
                >
                    Submit Feedback
                </button>
            </form>
            <div className="w-full max-w-md mt-8">
                {submittedFeedbacks.map((item, index) => (
                    <div key={index} className="bg-white p-4 mb-4 rounded-md shadow-md">
                        <div className="flex items-center mb-2">
                            {[...Array(5)].map((_, i) => (
                                <FaStar
                                    key={i}
                                    className={`${i < item.rating ? 'text-yellow-500' : 'text-gray-400'}`}
                                />
                            ))}
                        </div>
                        <p className="text-gray-700">{item.feedback}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Feedback;
