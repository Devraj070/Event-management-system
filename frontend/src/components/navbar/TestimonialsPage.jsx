import React from 'react';
import Slider from 'react-slick';
import { FaQuoteLeft } from 'react-icons/fa';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const TestimonialsPage = () => {
    const testimonials = [
        {
            id: 1,
            quote: "SpiderVision Systems delivered exceptional results for our business. Their expertise and dedication helped us achieve our goals.",
            author: "John Doe"
        },
        {
            id: 2,
            quote: "Working with SpiderVision Systems was a fantastic experience. They provided innovative solutions and excellent support.",
            author: "Jane Smith"
        },
        {
            id: 3,
            quote: "We highly recommend SpiderVision Systems to anyone seeking professional and reliable development services.",
            author: "Chris Johnson"
        }
    ];

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
        pauseOnHover: true,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    arrows: false,
                    dots: true
                }
            }
        ]
    };

    return (
        <div className="text-white py-16">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl font-bold text-yellow-500 mb-8 text-center">Client Testimonials</h2>
                <Slider {...settings} className="slick-container">
                    {testimonials.map(testimonial => (
                        <div key={testimonial.id} className="rounded-lg overflow-hidden shadow-lg bg-gray-800 p-8 transform transition duration-300 hover:scale-105">
                            <div className="flex items-center mb-4">
                                <FaQuoteLeft className="text-2xl text-green-500 mr-4" />
                                <p className="text-lg">{testimonial.quote}</p>
                            </div>
                            <p className="text-sm text-gray-400">- {testimonial.author}</p>
                        </div>
                    ))}
                </Slider>
            </div>
        </div>
    );
};

export default TestimonialsPage;
