import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaUser, FaBars, FaTimes } from 'react-icons/fa';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef(null);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const handleLogout = () => {
        sessionStorage.removeItem('userId');
        sessionStorage.removeItem('isLoggedIn');
        window.location.href = '/';
    };

    // Function to close the menu when clicking outside of it
    const handleClickOutside = (event) => {
        if (menuRef.current && !menuRef.current.contains(event.target)) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const isLoggedIn = sessionStorage.getItem('userId');

    return (
        <nav className="bg-white p-4 fixed top-0 left-0 w-full z-10 shadow-md">
            <div className="container mx-auto flex justify-between items-center">
                <a href='/' className="text-black text-2xl font-bold flex items-center">
                    <span className="mr-2">Event Management</span>
                </a>
                <div className="flex items-center">
                    {/* Mobile view */}
                    <div className="md:hidden">
                        {isOpen ? (
                            <FaTimes className="text-black text-2xl cursor-pointer" onClick={toggleMenu} />
                        ) : (
                            <FaBars className="text-black text-2xl cursor-pointer" onClick={toggleMenu} />
                        )}
                    </div>
                    {/* Mobile menu */}
                    <div ref={menuRef} className={`md:hidden ${isOpen ? 'block' : 'hidden'} bg-white absolute top-full left-0 right-0 rounded-md shadow-md p-4`}>
                        <Link to="/event-lists" className="text-black hover:bg-gray-100 rounded-md block px-4 py-2 mb-2" onClick={toggleMenu}>
                            Discover Events
                        </Link>
                        <Link to="/contact-us" className="text-black hover:bg-gray-100 rounded-md block px-4 py-2 mb-2" onClick={toggleMenu}>
                            Contact Us
                        </Link>
                        <Link
                            to="/dashboard" className="text-black hover:bg-gray-100 rounded-md block px-4 py-2 mb-2 border border-blue-500" onClick={toggleMenu}                       >
                            Dashboard
                        </Link>
                        {isLoggedIn ? (
                            <button onClick={handleLogout} className="text-black bg-red-400 hover:bg-red-500 rounded-md block px-4 py-2 mb-2">
                                Logout
                            </button>
                        ) : (
                            <Link to="/login" className="flex justify-center text-white bg-blue-500 hover:bg-gray-100 rounded-full px-4 py-2 mb-2" onClick={toggleMenu}>
                                Login
                                <FaUser className="ml-2 mt-1" />
                            </Link>
                        )}
                    </div>
                    {/* Desktop view */}
                    <div className="hidden md:flex md:items-center">
                        <Link to="/event-lists" className="text-black hover:bg-gray-100 rounded-md px-4 py-2">
                            Discover Events
                        </Link>
                        <Link to="/contact-us" className="text-black hover:bg-gray-100 rounded-md px-4 py-2" onClick={toggleMenu}>
                            Contact Us
                        </Link>
                        <Link to="/dashboard" className="text-black hover:bg-gray-100 rounded-md px-4 py-2 border border-blue-400">
                            Dashboard
                        </Link>
                        {isLoggedIn ? (
                            <button onClick={handleLogout} className="text-black bg-red-400 hover:bg-red-500 rounded-full px-4 py-2 ml-4">
                                Logout
                            </button>
                        ) : (
                            <Link to="/login" className="text-white bg-blue-500 hover:bg-blue-600 rounded-full px-4 py-2 ml-4">
                                <div className="flex items-center">
                                    Login
                                    <FaUser className="ml-1" />
                                </div>
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
