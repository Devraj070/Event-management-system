import React from 'react';

const QnA = () => {
    const faqs = [
        {
            question: "How do I book an event?",
            answer: "To book an event, simply navigate to the event page, click the 'Book Now' button, and follow the instructions. Make sure you are logged in to complete the booking."
        },
        {
            question: "Can I cancel my booking?",
            answer: "Sorry, you can't cancel your Booking once you have booked! incase of any emergency try to contact us! we will feel good to help you."
        },
        {
            question: "What payment methods are accepted?",
            answer: "As you know this is a Beta Version of Event management System, currently this is under test state. So now you do not have to make payments to book any available events. Enjoy!!!"
        },

        {
            question: "Are there any discounts available?",
            answer: "Discounts may be available for certain events. Check the event page for any promotional offers or discounts."
        }
    ];

    return (
        <div className="min-h-screen pt-20 pb-6">
            <h1 className="text-4xl font-extrabold mb-12 text-center text-white">Q&A</h1>
            <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
                {faqs.map((faq, index) => (
                    <div key={index} className="mb-8 border-b pb-4">
                        <h2 className="text-2xl font-semibold text-gray-900 mb-2">{faq.question}</h2>
                        <p className="text-gray-700">{faq.answer}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default QnA;
