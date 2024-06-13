// src/components/Main.js
import React from 'react';
import QnA from './QnA';
import Feedback from './Feedback';

const BothQnAandFeedback = () => {
    return (
        <div className="bg-gradient-to-b from-blue-700 to-gray-800 min-h-screen flex flex-col items-center pt-20 px-4">

            <div className="w-full max-w-6xl flex flex-col md:flex-row md:space-x-4">
                <div className="w-full md:w-1/2 mb-4 md:mb-0">
                    <QnA />
                </div>
                <div className="w-full md:w-1/2">
                    <Feedback />
                </div>
            </div>
        </div>
    );
};

export default BothQnAandFeedback;
