import React, { useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle, faFacebook } from '@fortawesome/free-brands-svg-icons';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import ForgotPasswordModal from './ForgotPasswordModal';

const Login = () => {
    const [isForgotPasswordOpen, setForgotPasswordOpen] = useState(false);

    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('https://event-management-system-pyg9.onrender.com/api/users/login', formData);
            console.log(response.data);

            // Store user data in session storage
            sessionStorage.setItem('userId', response.data.userId);
            sessionStorage.setItem('owner', response.data.owner);
            sessionStorage.setItem('isLoggedIn', 'true');

            toast.success('Login successful!');

            // Redirect after a short delay
            setTimeout(() => {
                navigate('/');
                window.location.reload();
            }, 2000);
        } catch (error) {
            console.error('Login failed:', error.response?.data || error.message);
            toast.error('Login failed! Please check your credentials and try again.');
        }
    };

    const toggleForgotPassword = () => {
        setForgotPasswordOpen(!isForgotPasswordOpen);
    };

    return (
        <>
            <div className="flex justify-center items-center min-h-screen bg-gray-600">
                <div className="bg-white p-10 rounded-lg shadow-lg w-full max-w-md">
                    <h2 className="text-3xl mb-6 text-center font-bold text-gray-700">Login</h2>
                    <form className="space-y-5" onSubmit={handleSubmit}>
                        <div>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Email"
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                            />
                        </div>
                        <div>
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Password"
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                            />
                        </div>
                        <div className="flex justify-between text-sm float-end cursor-pointer">
                            <p onClick={toggleForgotPassword} className="text-blue-500 hover:underline">Forgot password?</p>
                        </div>
                        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
                            Login
                        </button>
                    </form>
                    <div className="flex items-center justify-between mt-6">
                        <hr className="w-full border-gray-300" />
                        <span className="p-2 text-gray-400">OR</span>
                        <hr className="w-full border-gray-300" />
                    </div>
                    <div className="grid grid-cols-1 gap-4 mt-6">
                        <button onClick={() => toast.error('Admin says: This feature is in progress!! try manual Login')} className="flex items-center justify-center bg-red-500 text-white py-2 rounded-md hover:bg-red-600 focus:outline-none focus:bg-red-600">
                            <FontAwesomeIcon icon={faGoogle} className="mr-2" />
                            Login with Google
                        </button>
                        <button onClick={() => toast.error('Admin says: This feature is in progress!! try manual Login')} className="flex items-center justify-center bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:bg-blue-700">
                            <FontAwesomeIcon icon={faFacebook} className="mr-2" />
                            Login with Facebook
                        </button>
                    </div>
                    <div className="text-center mt-6 text-sm text-gray-600">
                        Don't have an account? <a href="/register" className="text-blue-500 hover:underline">Register</a>
                    </div>
                </div>
            </div>
            <ForgotPasswordModal isOpen={isForgotPasswordOpen} onClose={toggleForgotPassword} />
        </>
    );
};

export default Login;
