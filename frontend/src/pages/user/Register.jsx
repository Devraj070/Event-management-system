import React, { useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle, faFacebook } from '@fortawesome/free-brands-svg-icons';
import { Toaster, toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const handleChange = e => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value

        }));
    };

    const handleSubmit = async e => {
        e.preventDefault();

        const strongPasswordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+}{":;'?/>.<,])(?=.*[a-zA-Z]).{6,}$/;
        if (!strongPasswordRegex.test(formData.password)) {
            toast.error("Password should contain at least 6 characters including at least one number, one uppercase letter, one lowercase letter, and one special character");
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            toast.error('Passwords do not match');
            return;
        }
        try {
            const response = await axios.post('https://event-management-system-pyg9.onrender.com/api/users/register', formData);
            console.log(response.data);
            // Store user ID and registration status in session storage
            sessionStorage.setItem('userId', response.data.userId);
            sessionStorage.setItem('isRegistered', true);
            toast.success('Registration successful!');
            // Optionally, redirect user or show success message
            navigate('/login');
        } catch (error) {
            console.error('Registration failed:', error.response.data);
            toast.error('Registration failed!');
            // Optionally, display error message to user
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-800 mt-10">
            <Toaster />
            <div className="bg-white p-10 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-3xl mb-6 text-center font-bold text-gray-700">Register</h2>
                <form className="space-y-5" onSubmit={handleSubmit}>
                    <div>
                        <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Name" required className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black" />
                    </div>
                    <div>
                        <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" required className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black" />
                    </div>
                    <div>
                        <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" required className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black" />
                    </div>
                    <div>
                        <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} placeholder="Confirm Password" required className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black" />
                    </div>
                    <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">Register</button>
                </form>
                <div className="flex items-center justify-between mt-6">
                    <hr className="w-full border-gray-300" />
                    <span className="p-2 text-gray-400">OR</span>
                    <hr className="w-full border-gray-300" />
                </div>
{/*                 <div className="grid grid-cols-1 gap-4 mt-6">
                    <button onClick={() => toast.error('Admin says: This feature is in progress!! try manual Register')} className="flex items-center justify-center bg-red-500 text-white py-2 rounded-md hover:bg-red-600 focus:outline-none focus:bg-red-600">
                        <FontAwesomeIcon icon={faGoogle} className="mr-2" />
                        Register with Google
                    </button>
                    <button onClick={() => toast.error('Admin says: This feature is in progress!! try manual Register')} className="flex items-center justify-center bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:bg-blue-700">
                        <FontAwesomeIcon icon={faFacebook} className="mr-2" />
                        Register with Facebook
                    </button>
                </div> */}
                <div className="text-center mt-6 text-sm text-gray-600">
                    Already have an account? <a href="/login" className="text-blue-500 hover:underline">Login</a>
                </div>
            </div>
        </div>
    );
};

export default Register;
