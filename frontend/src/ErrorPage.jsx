import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaExclamationTriangle } from 'react-icons/fa';

const ErrorPage = () => {
    const location = useLocation();
    const errorType = location.state?.errorType || 'Error';
    const errorMessage = location.state?.errorMessage || 'Something went wrong!';

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="text-center">
                <FaExclamationTriangle className="text-red-500 text-6xl m-16" />
                <h1 className="text-4xl text-black font-bold mb-4">{errorType}</h1>
                <p className="text-lg text-gray-700 mb-8">{errorMessage}</p>
                <Link to="/" className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">
                    Go to Home
                </Link>
            </div>
        </div>
    );
};

export default ErrorPage;
