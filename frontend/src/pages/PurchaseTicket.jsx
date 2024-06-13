import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const PurchaseTicket = () => {
    const { eventId } = useParams();
    const [ticketType, setTicketType] = useState('');

    const handlePurchase = async () => {
        try {
            const response = await axios.post('http://localhost:3001/tickets/purchase', { eventId, ticketType });
            console.log('Ticket purchased:', response.data);
        } catch (error) {
            console.error('Ticket purchase error:', error);
        }
    };

    return (
        <div className="container mx-auto py-8">
            <h2 className="text-2xl mb-4">Purchase Ticket</h2>
            <select
                value={ticketType}
                onChange={(e) => setTicketType(e.target.value)}
                className="block mb-2 p-2 border"
            >
                <option value="">Select Ticket Type</option>
                <option value="VIP">VIP</option>
                <option value="General">General</option>
            </select>
            <button onClick={handlePurchase} className="p-2 bg-blue-500 text-white">Purchase</button>
        </div>
    );
};

export default PurchaseTicket;
