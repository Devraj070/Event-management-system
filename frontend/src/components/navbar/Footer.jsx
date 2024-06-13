import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-black py-6">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row items-center justify-between">
                    <div className="text-center md:text-left mb-4 md:mb-0">
                        <p className="text-white text-sm">© 2024 Event Management System. All rights reserved.</p>
                    </div>
                    <div className="text-center md:text-right">
                        <ul className="flex justify-center md:justify-end">
                            <li className="mr-4">
                                <a href="/about-us" className="text-white hover:text-gray-300">About</a>
                            </li>
                            <li className="mr-4">
                                <a href="/contact-us" className="text-white hover:text-gray-300">Contact</a>
                            </li>
                            <li>
                                <a href="/PrivacyPolicy" className="text-white hover:text-gray-300">Privacy Policy</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
