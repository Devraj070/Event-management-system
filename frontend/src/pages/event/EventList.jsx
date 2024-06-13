// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import toast, { Toaster } from 'react-hot-toast';
// import { FaCalendarAlt, FaClock, FaMapMarkerAlt, FaTicketAlt, FaLock } from 'react-icons/fa';

// const EventList = () => {
//     const [events, setEvents] = useState([]);
//     const [filteredEvents, setFilteredEvents] = useState([]);
//     const [filter, setFilter] = useState('');
//     const [sort, setSort] = useState('');
//     const navigate = useNavigate();

//     useEffect(() => {
//         const fetchEvents = async () => {
//             try {
//                 const response = await axios.get('https://event-management-system-pyg9.onrender.com/api/events');
//                 const sortedEvents = sortEvents(response.data.reverse(), sort);
//                 setEvents(sortedEvents);
//                 setFilteredEvents(sortedEvents);
//             } catch (error) {
//                 console.error('There was an error fetching the events!', error);
//             }
//         };

//         fetchEvents();
//     }, [sort]);

//     const handleBookNow = async (eventId) => {
//         const userId = sessionStorage.getItem('userId');
//         if (!userId) {
//             navigate('/login');
//             return;
//         }
//         try {
//             await axios.post('https://event-management-system-pyg9.onrender.com/api/bookings', { eventId, userId });
//             toast.success('Booking successful!');
//         } catch (error) {
//             if (error.response && error.response.status === 400) {
//                 toast.error(error.response.data.message);
//             } else {
//                 toast.error('There was an error booking the event!');
//             }
//         }
//     };

//     const handleFilterChange = (e) => {
//         const value = e.target.value;
//         setFilter(value);
//         const filtered = events.filter(event => event.title.toLowerCase().includes(value.toLowerCase()));
//         setFilteredEvents(filtered);
//     };

//     const handleSortChange = (e) => {
//         const value = e.target.value;
//         setSort(value);
//         const sorted = sortEvents(filteredEvents, value);
//         setFilteredEvents(sorted);
//     };

//     const sortEvents = (events, criterion) => {
//         switch (criterion) {
//             case 'date':
//                 return [...events].sort((a, b) => new Date(a.date) - new Date(b.date));
//             case 'price':
//                 return [...events].sort((a, b) => a.ticketPrice - b.ticketPrice);
//             default:
//                 return events;
//         }
//     };

//     return (
//         <div className="bg-blue-700 px-4 pt-20 min-h-screen pb-6">
//             <Toaster />
//             <h1 className="text-3xl font-bold mb-8 text-center">Upcoming Events</h1>
//             <div className="flex justify-between items-center mb-4">
//                 <div className="flex space-x-4">
//                     <input
//                         type="text"
//                         placeholder="Search by title"
//                         value={filter}
//                         onChange={handleFilterChange}
//                         className="py-2 px-6 rounded-md text-black"
//                     />
//                     <select value={sort} onChange={handleSortChange} className="py-2 px-6 rounded-md text-black">
//                         <option value="">Sort by</option>
//                         <option value="date">Date</option>
//                         <option value="price">Price</option>
//                     </select>
//                 </div>
//             </div>
//             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//                 {filteredEvents.map((event) => (
//                     <div key={event._id} className="bg-white shadow-lg rounded-lg overflow-hidden relative">
//                         <div className="p-6">
//                             <h2 className="text-xl font-semibold text-gray-800 mb-2">{event.title}</h2>
//                             <p className="text-sm text-gray-600 mb-4">{event.description}</p>
//                             <div className="flex items-center text-gray-700 mb-2">
//                                 <FaCalendarAlt className="mr-2" />
//                                 <span>{new Date(event.date).toLocaleDateString()}</span>
//                             </div>
//                             <div className="flex items-center text-gray-700 mb-2">
//                                 <FaClock className="mr-2" />
//                                 <span>{event.time}</span>
//                             </div>
//                             <div className="flex items-center text-gray-700 mb-2">
//                                 <FaMapMarkerAlt className="mr-2" />
//                                 <span>{event.location}</span>
//                             </div>
//                             <div className="flex items-center text-gray-700 mb-2">
//                                 <FaTicketAlt className="mr-2" />
//                                 <span>₹{event.ticketPrice}</span>
//                             </div>
//                             <div className="flex items-center text-gray-700 mb-2">
//                                 <FaLock className="mr-2" />
//                                 <span>{event.privacySetting}</span>
//                             </div>
//                         </div>
//                         <div className="absolute top-0 right-0 bg-green-400 px-4 py-2 rounded-tr-lg rounded-bl-lg">
//                             <span>Owner: {event.owner}</span>
//                         </div>
//                         <div className="px-6 py-4 bg-gray-100">
//                             <button
//                                 onClick={() => handleBookNow(event._id)}
//                                 className="w-full bg-indigo-500 text-white py-2 rounded-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600"
//                             >
//                                 Book Now
//                             </button>
//                         </div>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default EventList;
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { FaCalendarAlt, FaClock, FaMapMarkerAlt, FaTicketAlt, FaLock } from 'react-icons/fa';
import Spinner from '../../Loading/spinner.svg'

const EventList = () => {
    const [events, setEvents] = useState([]);
    const [filteredEvents, setFilteredEvents] = useState([]);
    const [filter, setFilter] = useState('');
    const [sort, setSort] = useState('');
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await axios.get('https://event-management-system-pyg9.onrender.com/api/events');
                const sortedEvents = sortEvents(response.data.reverse(), sort);
                setEvents(sortedEvents);
                setFilteredEvents(sortedEvents);
                setLoading(false);
            } catch (error) {
                console.error('There was an error fetching the events!', error);
                setLoading(false);
            }
        };

        fetchEvents();
    }, [sort]);

    const handleBookNow = async (eventId) => {
        const userId = sessionStorage.getItem('userId');
        if (!userId) {
            navigate('/login');
            return;
        }
        try {
            await axios.post('https://event-management-system-pyg9.onrender.com/api/bookings', { eventId, userId });
            toast.success('Booking successful!');
            // Update the booked status of the event
            const updatedEvents = events.map(event =>
                event._id === eventId ? { ...event, booked: true } : event
            );
            setEvents(updatedEvents);
            setFilteredEvents(updatedEvents);
        } catch (error) {
            if (error.response && error.response.status === 400) {
                toast.error(error.response.data.message);
            } else {
                toast.error('There was an error booking the event!');
            }
        }
    };

    const handleFilterChange = (e) => {
        const value = e.target.value;
        setFilter(value);
        const filtered = events.filter(event => event.title.toLowerCase().includes(value.toLowerCase()));
        setFilteredEvents(filtered);
    };

    const handleSortChange = (e) => {
        const value = e.target.value;
        setSort(value);
        const sorted = sortEvents(filteredEvents, value);
        setFilteredEvents(sorted);
    };

    const sortEvents = (events, criterion) => {
        switch (criterion) {
            case 'date':
                return [...events].sort((a, b) => new Date(a.date) - new Date(b.date));
            case 'price':
                return [...events].sort((a, b) => a.ticketPrice - b.ticketPrice);
            default:
                return events;
        }
    };

    return (
        <div className="bg-blue-700 px-4 pt-20 min-h-screen pb-6">
            <Toaster />
            <h1 className="text-3xl font-bold mb-8 text-center">Upcoming Events</h1>
            <div className="flex justify-between items-center mb-4">
                <div className="flex space-x-4">
                    <input
                        type="text"
                        placeholder="Search by title"
                        value={filter}
                        onChange={handleFilterChange}
                        className="py-2 px-6 rounded-md text-black"
                    />
                    <select value={sort} onChange={handleSortChange} className="py-2 px-4 rounded-md text-black">
                        <option value="">Sort by</option>
                        <option value="date">Date</option>
                        <option value="price">Price</option>
                    </select>
                </div>
            </div>
            {loading ? (
                <div className="min-h-screen bg-gray-200 flex justify-center items-center">
                    <Spinner className="h-20 w-20" />
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {filteredEvents.map((event) => (
                        <div key={event._id} className="bg-white shadow-lg rounded-lg overflow-hidden relative">
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
                                <div className="flex items-center text-gray-700 mb-2">
                                    <FaLock className="mr-2" />
                                    <span>{event.privacySetting}</span>
                                </div>
                            </div>
                            <div className="absolute top-0 right-0 bg-green-400 px-4 py-2 rounded-tr-lg rounded-bl-lg">
                                <span>Owner: {event.owner}</span>
                            </div>
                            <div className="px-6 py-4 bg-gray-100">
                                <button
                                    onClick={() => handleBookNow(event._id)}
                                    className={`w-full py-2 rounded-md focus:outline-none ${event.booked ? 'bg-gray-400 cursor-not-allowed' : 'bg-indigo-500 text-white hover:bg-indigo-600 focus:bg-indigo-600'
                                        }`}
                                    disabled={event.booked}
                                >
                                    {event.booked ? 'Booked' : 'Book Now'}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default EventList;
