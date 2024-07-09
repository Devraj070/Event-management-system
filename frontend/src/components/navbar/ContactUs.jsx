
import React from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import { FaUser, FaEnvelope, FaPhone, FaRegCommentDots, FaPaperPlane } from 'react-icons/fa';

const ContactUs = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    const onSubmit = async (data) => {
        try {
            await axios.post('https://event-management-system-pyg9.onrender.com/api/contact', data);
            toast.success('Form submitted successfully!');
            reset();
        } catch (error) {
            toast.error('Error submitting the form.');
        }
    };

    return (
        <div className="pt-20 min-h-screen bg-slate-500 px-6">
            <h1 className="text-3xl font-bold mb-8 text-center">Contact Us</h1>
            <div className="max-w-lg mx-auto">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-white font-semibold mb-2">
                            <FaUser className="inline-block mr-2" /> Your Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            {...register('name', { required: 'Name is required' })}
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500 text-black"
                        />
                        {errors.name && <span className="text-red-500">{errors.name.message}</span>}
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-white font-semibold mb-2">
                            <FaEnvelope className="inline-block mr-2" /> Your Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            {...register('email', {
                                required: 'Email is required',
                                pattern: {
                                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                                    message: 'Invalid email address'
                                }
                            })}
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500 text-black"
                        />
                        {errors.email && <span className="text-red-500">{errors.email.message}</span>}
                    </div>
                    <div className="mb-4">
                        <label htmlFor="phone" className="block text-white font-semibold mb-2">
                            <FaPhone className="inline-block mr-2" /> Phone Number
                        </label>
                        <input
                            type="text"
                            id="phone"
                            name="phone"
                            {...register('phone', {
                                required: 'Phone number is required',
                                pattern: {
                                    value: /^[0-9]+$/,
                                    message: 'Invalid phone number'
                                }
                            })}
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500 text-black"
                        />
                        {errors.phone && <span className="text-red-500">{errors.phone.message}</span>}
                    </div>
                    <div className="mb-4">
                        <label htmlFor="subject" className="block text-white font-semibold mb-2">
                            <FaRegCommentDots className="inline-block mr-2" /> Subject
                        </label>
                        <input
                            type="text"
                            id="subject"
                            name="subject"
                            {...register('subject', { required: 'Subject is required' })}
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500 text-black"
                        />
                        {errors.subject && <span className="text-red-500">{errors.subject.message}</span>}
                    </div>
                    <div className="mb-4">
                        <label htmlFor="message" className="block text-white font-semibold mb-2">
                            <FaPaperPlane className="inline-block mr-2" /> Message
                        </label>
                        <textarea
                            id="message"
                            name="message"
                            {...register('message', { required: 'Message is required' })}
                            rows="5"
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500 text-black"
                        ></textarea>
                        {errors.message && <span className="text-red-500">{errors.message.message}</span>}
                    </div>
                    <div className="text-center">
                        <button
                            type="submit"
                            className="bg-blue-500 text-white py-2 px-6 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ContactUs;
