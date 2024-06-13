import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaPlus, FaListUl, FaTicketAlt } from 'react-icons/fa';
import BookedEvents from '../pages/BookedEvent';
import MyEvents from '../pages/event/UserEvents';
import CreateEvent from '../pages/event/MakeEvent';

const Dashboard = () => {
    const navigate = useNavigate();
    const [selectedPage, setSelectedPage] = useState('booked-events');

    useEffect(() => {
        const userId = sessionStorage.getItem('userId');
        if (!userId) {
            navigate('/login');
        }
    }, [navigate]);

    return (
        <div className="pt-16 mx-auto bg-slate-500 h-screen flex flex-col lg:flex-row">
            <div className="w-full lg:w-1/4 p-6 bg-slate-600">
                <h1 className="text-3xl font-bold mb-4 text-white">Dashboard</h1>
                <div className="space-y-4">
                    <button
                        onClick={() => setSelectedPage('create-event')}
                        className={`block w-full text-left px-6 py-3 rounded-md text-center ${selectedPage === 'create-event' ? 'bg-blue-600' : 'bg-blue-500'} text-white hover:bg-blue-600 transition duration-300`}
                    >
                        <FaPlus className="mr-2 inline" /> Create New Event
                    </button>
                    <button
                        onClick={() => setSelectedPage('my-events')}
                        className={`block w-full text-left px-6 py-3 rounded-md text-center ${selectedPage === 'my-events' ? 'bg-purple-600' : 'bg-purple-500'} text-white hover:bg-purple-600 transition duration-300`}
                    >
                        <FaListUl className="mr-2 inline" /> My Events
                    </button>
                    <button
                        onClick={() => setSelectedPage('booked-events')}
                        className={`block w-full text-left px-6 py-3 rounded-md text-center ${selectedPage === 'booked-events' ? 'bg-green-600' : 'bg-green-500'} text-white hover:bg-green-600 transition duration-300`}
                    >
                        <FaTicketAlt className="mr-2 inline" /> Booked Events
                    </button>
                </div>
            </div>
            <div className="w-full lg:w-3/4 p-6 bg-slate-400 overflow-auto">
                {selectedPage === 'create-event' && <CreateEvent />}
                {selectedPage === 'my-events' && <MyEvents />}
                {selectedPage === 'booked-events' && <BookedEvents />}
            </div>
        </div>
    );
};

export default Dashboard;
