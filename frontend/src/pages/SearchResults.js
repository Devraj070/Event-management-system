
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { FaCalendarAlt, FaClock, FaMapMarkerAlt, FaTicketAlt } from 'react-icons/fa';
import { ReactComponent as Spinner } from '../Loading/spinner.svg';

const SearchResults = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const query = new URLSearchParams(location.search).get('query');

    useEffect(() => {
        const fetchSearchResults = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`https://event-management-system-pyg9.onrender.com/api/search?query=${query}`);
                setEvents(response.data.data);
            } catch (error) {
                console.error('There was an error fetching the search results!', error);
            } finally {
                setLoading(false);
            }
        };

        if (query) {
            fetchSearchResults();
        }
    }, [query]);

    const handleBookNow = async (eventId) => {
        const userId = sessionStorage.getItem('userId');
        if (!userId) {
            navigate('/login');
            return;
        }
        try {
            await axios.post('https://event-management-system-pyg9.onrender.com/api/bookings', { eventId, userId });
            toast.success('Booking successful!');
        } catch (error) {
            if (error.response && error.response.status === 400) {
                toast.error(error.response.data.message);
            } else {
                toast.error('There was an error booking the event!');
            }
        }
    };

    return (
        <div className="bg-blue-700 px-4 pt-20 min-h-screen pb-6">
            <h3 className="text-2xl font-bolds pt-20 text-white">Search Results for "{query}"</h3>
            <div className="max-w-7xl mx-auto p-8 mt-3">
                {loading ? (
                    <div className="min-h-screen flex justify-center items-center">
                        <Spinner className="h-20 w-20" />
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {events.map((event) => (
                            <div key={event._id} className="relative">
                                <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                                    <div className="p-6">
                                        <h2 className="text-xl font-semibold text-gray-800 mb-2">{event.title}</h2>
                                        <p className="text-sm text-gray-600 mb-4">{event.description}</p>
                                        <div className="flex items-center text-gray-700 mb-2">
                                            <FaCalendarAlt className="mr-2" />
                                            <span>{new Date(event.date).toLocaleDateString()}</span>
                                        </div>
                                        <div className="flex items-center text-gray-700 mb-2">
                                            <FaClock className="mr-2" />
                                            <span>{event.time}</span>
                                        </div>
                                        <div className="flex items-center text-gray-700 mb-2">
                                            <FaMapMarkerAlt className="mr-2" />
                                            <span>{event.location}</span>
                                        </div>
                                        <div className="flex items-center text-gray-700 mb-2">
                                            <FaTicketAlt className="mr-2" />
                                            <span>₹{event.ticketPrice}</span>
                                        </div>
                                    </div>
                                    <div className="px-6 py-4 bg-gray-100">
                                        <button
                                            onClick={() => handleBookNow(event._id)}
                                            className="w-full bg-indigo-500 text-white py-2 rounded-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600"
                                        >
                                            Book Now
                                        </button>
                                    </div>
                                </div>
                                <div className="absolute top-0 right-0 bg-green-400 px-4 py-2 rounded-tr-lg rounded-bl-lg">
                                    <span className="text-sm text-white">Owner: {event.owner}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default SearchResults;
