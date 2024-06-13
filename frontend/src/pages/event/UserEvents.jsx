// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Link } from 'react-router-dom';
// import { toast, Toaster } from 'react-hot-toast';
// import { FaPlus, FaEdit, FaTrashAlt, FaRegCalendarAlt, FaMapMarkerAlt, FaTicketAlt, FaLock } from 'react-icons/fa';

// const UserEvents = () => {
//     const [events, setEvents] = useState([]);
//     const userId = sessionStorage.getItem('userId');

//     useEffect(() => {
//         const fetchEvents = async () => {
//             try {
//                 const response = await axios.get(`http://localhost:5000/api/events/user/${userId}`);
//                 setEvents(response.data.reverse());
//             } catch (error) {
//                 console.error('There was an error fetching the events!', error);
//                 toast.error('Error fetching events!');
//             }
//         };

//         fetchEvents();
//     }, [userId]);

//     const handleDelete = async (eventId) => {
//         try {
//             await axios.delete(`http://localhost:5000/api/events/${eventId}`);
//             setEvents(events.filter(event => event._id !== eventId));
//             toast.success('Event and associated bookings deleted successfully!');
//         } catch (error) {
//             console.error('Error deleting event:', error);
//             toast.error('Error deleting event!');
//         }
//     };

//     return (
//         <div className="container mx-auto px-4 min-h-screen">
//             <Toaster />
//             <div className="flex flex-col sm:flex-row justify-between items-center mb-8">
//                 <h1 className="text-3xl sm:text-4xl font-bold mb-4 sm:mb-0">My Events</h1>
//                 <Link to="/create-event" className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 flex items-center">
//                     <FaPlus className="mr-2" /> Create New Event
//                 </Link>
//             </div>
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//                 {events.map((event) => (
//                     <div key={event._id} className="p-6 border rounded-lg shadow-lg bg-white hover:shadow-xl transition-shadow duration-300">
//                         <h2 className="text-2xl font-bold text-black mb-3">{event.title}</h2>
//                         <p className="text-gray-700 mb-4">{event.description}</p>
//                         <div className="flex items-center text-gray-500 mb-2">
//                             <FaRegCalendarAlt className="mr-2" />
//                             {new Date(event.date).toLocaleDateString()} at {event.time}
//                         </div>
//                         <div className="flex items-center text-gray-500 mb-2">
//                             <FaMapMarkerAlt className="mr-2" />
//                             Location: {event.location}
//                         </div>
//                         <div className="flex items-center text-gray-500 mb-2">
//                             <FaTicketAlt className="mr-2" />
//                             Ticket Price: ₹{event.ticketPrice}
//                         </div>
//                         <div className="flex items-center text-gray-500 mb-4">
//                             <FaLock className="mr-2" />
//                             Privacy: {event.privacySetting}
//                         </div>
//                         <div className="flex justify-between items-center">
//                             <Link to={`/update-event/${event._id}`} className="text-white hover:text-gray-200 bg-blue-700 px-3 py-1 rounded-sm flex items-center">
//                                 <FaEdit className="mr-2" /> Edit
//                             </Link>
//                             <button
//                                 onClick={() => handleDelete(event._id)}
//                                 className="text-white hover:text-gray-200 bg-red-400 px-3 rounded-sm py-1 flex items-center"
//                             >
//                                 <FaTrashAlt className="mr-2" /> Delete
//                             </button>
//                         </div>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default UserEvents;
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { toast, Toaster } from 'react-hot-toast';
import { FaPlus, FaEdit, FaTrashAlt, FaRegCalendarAlt, FaMapMarkerAlt, FaTicketAlt, FaLock, FaUsers } from 'react-icons/fa';

const UserEvents = () => {
    const [events, setEvents] = useState([]);
    const userId = sessionStorage.getItem('userId');

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/events/user/${userId}`);
                setEvents(response.data.reverse());
            } catch (error) {
                console.error('There was an error fetching the events!', error);
                toast.error('Error fetching events!');
            }
        };

        fetchEvents();
    }, [userId]);

    const handleDelete = async (eventId) => {
        try {
            await axios.delete(`http://localhost:5000/api/events/${eventId}`);
            setEvents(events.filter(event => event._id !== eventId));
            toast.success('Event and associated bookings deleted successfully!');
        } catch (error) {
            console.error('Error deleting event:', error);
            toast.error('Error deleting event!');
        }
    };

    return (
        <div className="container mx-auto px-4 min-h-screen">
            <Toaster />
            <div className="flex flex-col sm:flex-row justify-between items-center mb-8">
                <h1 className="text-3xl sm:text-4xl font-bold mb-4 sm:mb-0">My Events</h1>
                <Link to="/create-event" className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 flex items-center">
                    <FaPlus className="mr-2" /> Create New Event
                </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {events.map((event) => (
                    <div key={event._id} className="relative p-6 border rounded-lg shadow-lg bg-white hover:shadow-xl transition-shadow duration-300">
                        <div className="absolute top-0 right-0 bg-gray-800 px-4 py-2 rounded-tr-lg rounded-full flex items-center shadow-gray-600 shadow-lg">
                            <FaUsers className="mr-1" /> Booked: {event.bookingsCount}
                        </div>
                        <h2 className="text-2xl font-bold text-black mb-3">{event.title}</h2>
                        <p className="text-gray-700 mb-4">{event.description}</p>
                        <div className="flex items-center text-gray-500 mb-2">
                            <FaRegCalendarAlt className="mr-2" />
                            {new Date(event.date).toLocaleDateString()} at {event.time}
                        </div>
                        <div className="flex items-center text-gray-500 mb-2">
                            <FaMapMarkerAlt className="mr-2" />
                            Location: {event.location}
                        </div>
                        <div className="flex items-center text-gray-500 mb-2">
                            <FaTicketAlt className="mr-2" />
                            Ticket Price: ₹{event.ticketPrice}
                        </div>
                        <div className="flex items-center text-gray-500 mb-4">
                            <FaLock className="mr-2" />
                            Privacy: {event.privacySetting}
                        </div>
                        <div className="flex justify-between items-center">
                            <Link to={`/update-event/${event._id}`} className="text-white hover:text-gray-200 bg-blue-700 px-3 py-1 rounded-sm flex items-center">
                                <FaEdit className="mr-2" /> Edit
                            </Link>
                            <button
                                onClick={() => handleDelete(event._id)}
                                className="text-white hover:text-gray-200 bg-red-400 px-3 rounded-sm py-1 flex items-center"
                            >
                                <FaTrashAlt className="mr-2" /> Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default UserEvents;
