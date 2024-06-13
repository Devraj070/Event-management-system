import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const Discussion = () => {
    const { eventId } = useParams();
    const [message, setMessage] = useState('');
    const [discussions, setDiscussions] = useState([]);

    useEffect(() => {
        const fetchDiscussions = async () => {
            try {
                const response = await axios.get(`http://3001/discussions/${eventId}`);
                setDiscussions(response.data);
            } catch (error) {
                console.error('Error fetching discussions:', error);
            }
        };
        fetchDiscussions();
    }, [eventId]);

    const handlePostMessage = async () => {
        try {
            const response = await axios.post('http://3001/discussions/post', { eventId, message });
            setDiscussions([...discussions, response.data]);
            setMessage('');
        } catch (error) {
            console.error('Error posting message:', error);
        }
    };

    return (
        <div className="container mx-auto py-8">
            <h2 className="text-2xl mb-4">Discussion</h2>
            {discussions.map(discussion => (
                <div key={discussion._id} className="mb-4 p-4 border rounded shadow-sm">
                    <p>{discussion.message}</p>
                </div>
            ))}
            <input
                type="text"
                placeholder="Post a message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="block mb-2 p-2 border"
            />
            <button onClick={handlePostMessage} className="p-2 bg-blue-500 text-white">Post</button>
        </div>
    );
};

export default Discussion;
