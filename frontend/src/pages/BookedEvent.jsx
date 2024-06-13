// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { FaMapMarkerAlt, FaCalendarAlt, FaClock, FaTicketAlt } from 'react-icons/fa';

// const BookedEvent = () => {
//     const [bookedEvents, setBookedEvents] = useState([]);
//     const userId = sessionStorage.getItem('userId');

//     useEffect(() => {
//         const fetchBookedEvents = async () => {
//             try {
//                 const response = await axios.get(`http://localhost:5000/api/bookings/user/${userId}`);
//                 setBookedEvents(response.data.reverse());
//             } catch (error) {
//                 console.error('Error fetching booked events:', error);
//             }
//         };

//         if (userId) {
//             fetchBookedEvents();
//         } else {
//             console.log('User is not logged in');
//             // Optionally handle redirection to login or display a message
//         }
//     }, [userId]);

//     return (
//         <div className="container mx-auto py-8 px-4">
//             <h2 className="text-4xl font-bold mb-8 text-center text-white">My Booked Events</h2>
//             {bookedEvents.length > 0 ? (
//                 bookedEvents.map(event => (
//                     <div
//                         key={event._id}
//                         className="mb-6 p-6 bg-white border-l-4 border-green-500 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
//                     >
//                         <div className="flex flex-col sm:flex-row items-center sm:items-start">
//                             <div className="w-full sm:w-2/3">
//                                 <h3 className="text-2xl font-bold mb-2 text-gray-800">{event.title}</h3>
//                                 <p className="text-gray-700 mb-4">{event.description}</p>
//                                 <div className="flex items-center mb-2 text-gray-700">
//                                     <FaCalendarAlt className="mr-2 text-green-500" />
//                                     <span>{new Date(event.date).toLocaleDateString()}</span>
//                                 </div>
//                                 <div className="flex items-center mb-2 text-gray-700">
//                                     <FaClock className="mr-2 text-green-500" />
//                                     <span>{event.time}</span>
//                                 </div>
//                                 <div className="flex items-center mb-2 text-gray-700">
//                                     <FaMapMarkerAlt className="mr-2 text-green-500" />
//                                     <span>{event.location}</span>
//                                 </div>
//                             </div>
//                             <div className="w-full sm:w-1/3 mt-4 sm:mt-0 text-center sm:text-right">
//                                 <div className="inline-block bg-green-100 text-green-700 px-3 py-1 rounded-full font-semibold mb-2">
//                                     <FaTicketAlt className="inline mr-2" />
//                                     ₹{event.ticketPrice}
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 ))
//             ) : (
//                 <p className="text-white text-center">No booked events found</p>
//             )}
//         </div>
//     );
// };

// export default BookedEvent;
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaMapMarkerAlt, FaCalendarAlt, FaClock, FaTicketAlt, FaUser } from 'react-icons/fa';

const BookedEvent = () => {
    const [bookedEvents, setBookedEvents] = useState([]);
    const userId = sessionStorage.getItem('userId');

    useEffect(() => {
        const fetchBookedEvents = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/bookings/user/${userId}`);
                setBookedEvents(response.data.reverse());
            } catch (error) {
                console.error('Error fetching booked events:', error);
            }
        };

        if (userId) {
            fetchBookedEvents();
        } else {
            console.log('User is not logged in');
            // Optionally handle redirection to login or display a message
        }
    }, [userId]);

    return (
        <div className="container mx-auto py-8 px-4">
            <h2 className="text-4xl font-bold mb-8 text-center text-white">My Booked Events</h2>
            {bookedEvents.length > 0 ? (
                bookedEvents.map(event => (
                    <div
                        key={event._id}
                        className="mb-6 p-6 bg-white border-l-4 border-green-500 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
                    >
                        <div className="flex flex-col sm:flex-row items-center sm:items-start">
                            <div className="w-full sm:w-2/3">
                                <h3 className="text-2xl font-bold mb-2 text-gray-800">{event.title}</h3>
                                <p className="text-gray-700 mb-4">{event.description}</p>
                                <div className="flex items-center mb-2 text-gray-700">
                                    <FaCalendarAlt className="mr-2 text-green-500" />
                                    <span>{new Date(event.date).toLocaleDateString()}</span>
                                </div>
                                <div className="flex items-center mb-2 text-gray-700">
                                    <FaClock className="mr-2 text-green-500" />
                                    <span>{event.time}</span>
                                </div>
                                <div className="flex items-center mb-2 text-gray-700">
                                    <FaMapMarkerAlt className="mr-2 text-green-500" />
                                    <span>{event.location}</span>
                                </div>
                                <div className="flex items-center mb-2 text-gray-700">
                                    <FaUser className="mr-2 text-green-500" />
                                    <span>Owner: {event.owner}</span>
                                </div>
                            </div>
                            <div className="w-full sm:w-1/3 mt-4 sm:mt-0 text-center sm:text-right">
                                <div className="inline-block bg-green-100 text-green-700 px-3 py-1 rounded-full font-semibold mb-2">
                                    <FaTicketAlt className="inline mr-2" />
                                    ₹{event.ticketPrice}
                                </div>
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                <p className="text-white text-center">No booked events found</p>
            )}
        </div>
    );
};

export default BookedEvent;
