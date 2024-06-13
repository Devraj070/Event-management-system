import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Toaster, toast } from 'react-hot-toast';

import { FaCalendarAlt, FaClock, FaMapMarkerAlt, FaTag, FaInfoCircle, FaLock, FaGlobeAmericas } from 'react-icons/fa';

const MakeEvent = () => {
    const [event, setEvent] = useState({
        title: '',
        description: '',
        date: '',
        time: '',
        location: '',
        ticketPrice: '',
        privacySetting: 'public',
    });
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const userId = sessionStorage.getItem('userId');
    const owner = sessionStorage.getItem('owner');

    const navigate = useNavigate();

    useEffect(() => {
        if (userId) {
            setIsLoggedIn(true);
        } else {
            navigate('/login');
        }
    }, [userId, navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEvent((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('https://event-management-system-pyg9.onrender.com/api/events/create', { ...event, userId, owner });
            console.log(response.data);
            toast.success('Event created and hosted for promotion!');
            navigate('/dashboard');
        } catch (error) {
            console.error('There was an error creating the event!', error);
            toast.error('There was an error creating the event!');
        }
    };

    if (!isLoggedIn) {
        return null; // Or a different UI for non-logged in users
    }

    return (
        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto px-8 py-4 shadow-md rounded-lg bg-white my-36 ">
            <Toaster />
            <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                    <label className="block text-black text-sm font-bold mb-2 flex items-center">
                        <FaInfoCircle className="mr-2" /> Title:
                    </label>
                    <input
                        type="text"
                        name="title"
                        value={event.title}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-indigo-500 text-black"
                    />
                </div>
                <div>
                    <label className="block text-black text-sm font-bold mb-2 flex items-center">
                        <FaTag className="mr-2" /> Description:
                    </label>
                    <textarea
                        name="description"
                        value={event.description}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-indigo-500 text-black"
                    />
                </div>
                <div>
                    <label className="block text-black text-sm font-bold mb-2 flex items-center">
                        <FaCalendarAlt className="mr-2" /> Date:
                    </label>
                    <input
                        type="date"
                        name="date"
                        value={event.date}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-indigo-500 text-black"
                    />
                </div>
                <div>
                    <label className="block text-black text-sm font-bold mb-2 flex items-center">
                        <FaClock className="mr-2" /> Time:
                    </label>
                    <input
                        type="time"
                        name="time"
                        value={event.time}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-indigo-500 text-black"
                    />
                </div>
                <div>
                    <label className="block text-black text-sm font-bold mb-2 flex items-center">
                        <FaMapMarkerAlt className="mr-2" /> Location:
                    </label>
                    <input
                        type="text"
                        name="location"
                        value={event.location}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-indigo-500 text-black"
                    />
                </div>
                <div>
                    <label className="block text-black text-sm font-bold mb-2 flex items-center">
                        <FaTag className="mr-2" /> Ticket Price:
                    </label>
                    <input
                        type="number"
                        name="ticketPrice"
                        value={event.ticketPrice}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-indigo-500 text-black"
                    />
                </div>
                <div className="col-span-2">
                    <label className="block text-black text-sm font-bold mb-2 flex items-center">
                        {event.privacySetting === 'private' ? <FaLock className="mr-2" /> : <FaGlobeAmericas className="mr-2" />} Privacy Setting:
                    </label>
                    <select
                        name="privacySetting"
                        value={event.privacySetting}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-indigo-500 text-black"
                    >
                        <option value="public">Public</option>
                        <option value="private">Private</option>
                    </select>
                </div>
            </div>
            <button
                type="submit"
                className="w-full bg-indigo-500 text-white py-2 px-4 rounded-lg hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600"
            >
                Create Event
            </button>
        </form>
    );
};

export default MakeEvent;
