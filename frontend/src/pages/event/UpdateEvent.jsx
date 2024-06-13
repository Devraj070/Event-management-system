// src/components/UpdateEvent.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { toast, Toaster } from 'react-hot-toast';

const UpdateEvent = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [event, setEvent] = useState({
        title: '',
        description: '',
        date: '',
        time: '',
        location: '',
        ticketPrice: '',
        privacySetting: 'public',
    });

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/events/${id}`);
                const eventData = response.data;
                setEvent({
                    ...eventData,
                    date: eventData.date.split('T')[0], // Format date to yyyy-MM-dd
                    time: eventData.time.slice(0, 5), // Format time to HH:mm
                });
            } catch (error) {
                console.error('Error fetching event:', error);
                toast.error('Error fetching event!');
            }
        };

        fetchEvent();
    }, [id]);

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
            await axios.put(`http://localhost:5000/api/events/${id}`, event);
            toast.success('Event updated successfully!');
            setTimeout(() => {
                navigate('/dashboard');
            }, 2000);
        } catch (error) {
            console.error('Error updating event:', error);
            toast.error('Error updating event!');
        }
    };

    return (
        <div>
            <Toaster />
            <form onSubmit={handleSubmit} className="max-w-4xl mx-auto m-16 p-8 shadow-md rounded-lg bg-white mt-40">
                <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                        <label className="block text-black text-sm font-bold mb-2">Title:</label>
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
                        <label className="block text-black text-sm font-bold mb-2">Description:</label>
                        <textarea
                            name="description"
                            value={event.description}
                            onChange={handleChange}
                            required
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-indigo-500 text-black"
                        />
                    </div>
                    <div>
                        <label className="block text-black text-sm font-bold mb-2">Date:</label>
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
                        <label className="block text-black text-sm font-bold mb-2">Time:</label>
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
                        <label className="block text-black text-sm font-bold mb-2">Location:</label>
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
                        <label className="block text-black text-sm font-bold mb-2">Ticket Price:</label>
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
                        <label className="block text-black text-sm font-bold mb-2">Privacy Setting:</label>
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
                    Update Event
                </button>
            </form>
        </div>
    );
};

export default UpdateEvent;
