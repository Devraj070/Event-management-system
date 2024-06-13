import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaRegCalendarAlt, FaClock, FaMapMarkerAlt, FaTicketAlt } from 'react-icons/fa';

const EventDiscovery = () => {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await axios.get('http://localhost:3001/events/all');
                setEvents(response.data);
            } catch (error) {
                console.error('Error fetching events:', error);
            }
        };
        fetchEvents();
    }, []);

    return (
        <div className="container mx-auto py-8">
            <h2 className="text-2xl mb-4">Discover Events</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {events.map(event => (
                    <div key={event._id} className="p-4 border rounded shadow-sm bg-white hover:shadow-lg transition-shadow duration-300">
                        <h3 className="text-xl font-bold mb-2">{event.title}</h3>
                        <p className="text-gray-700 mb-4">{event.description}</p>
                        <div className="flex items-center text-gray-500 mb-2">
                            <FaRegCalendarAlt className="mr-2" />
                            {new Date(event.date).toLocaleDateString()}
                        </div>
                        <div className="flex items-center text-gray-500 mb-2">
                            <FaClock className="mr-2" />
                            {event.time}
                        </div>
                        <div className="flex items-center text-gray-500 mb-2">
                            <FaMapMarkerAlt className="mr-2" />
                            {event.location}
                        </div>
                        <div className="flex items-center text-gray-500 mb-4">
                            <FaTicketAlt className="mr-2" />
                            ₹{event.ticketPrice}
                        </div>
                        <button className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300">View Details</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default EventDiscovery;
