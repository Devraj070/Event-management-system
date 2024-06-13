// // src/components/HeroSection/HeroSection.js

// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import heroimg from '../../Assets/hero-img.png';

// const HeroSection = () => {
//     const navigate = useNavigate();
//     const isLoggedIn = sessionStorage.getItem('isLoggedIn') === 'true';
//     const [searchQuery, setSearchQuery] = useState('');

//     const handleButtonClick = () => {
//         if (isLoggedIn) {
//             navigate('/event-lists');
//         } else {
//             navigate('/login');
//         }
//     };

//     const handleSearch = () => {
//         navigate(`/search-results?query=${searchQuery}`);
//     };

//     return (
//         <section className="flex items-center justify-center min-h-screen bg-blue-700 text-white">
//             <div className="container mx-auto flex flex-col md:flex-row items-center justify-between px-6 py-12">
//                 <div className="md:w-1/2 mb-10 md:mb-0">
//                     <img src={heroimg} alt="Hero Background" className="object-cover rounded-lg shadow-md" />
//                 </div>
//                 <div className="md:w-1/2 md:pl-10">
//                     <h1 className="text-4xl md:text-5xl font-bold mb-4">Welcome to Event Management System</h1>
//                     <p className="text-lg md:text-xl mb-6">Create, manage, and promote your events with ease.</p>
//                     <div className="flex mb-6">
//                         <input
//                             type="text"
//                             placeholder="Search for events..."
//                             value={searchQuery}
//                             onChange={(e) => setSearchQuery(e.target.value)}
//                             className="bg-white text-blue-500 px-4 py-2 rounded-l-md focus:outline-none"
//                         />
//                         <button
//                             onClick={handleSearch}
//                             className="bg-blue-500 text-white px-6 py-2 rounded-r-md hover:bg-blue-600 transition duration-300"
//                         >
//                             Search
//                         </button>
//                     </div>
//                     <button
//                         onClick={handleButtonClick}
//                         className="bg-white text-blue-500 px-6 py-3 rounded-md font-semibold hover:bg-blue-100 transition duration-300"
//                     >
//                         {isLoggedIn ? 'Explore Events' : 'Get Started'}
//                     </button>
//                 </div>
//             </div>
//         </section>
//     );
// };

// export default HeroSection;
// src/components/HeroSection/HeroSection.js

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import heroimg from '../../Assets/hero-img.png';

const HeroSection = () => {
    const navigate = useNavigate();
    const isLoggedIn = sessionStorage.getItem('isLoggedIn') === 'true';
    const [searchQuery, setSearchQuery] = useState('');

    const handleButtonClick = () => {
        if (isLoggedIn) {
            navigate('/event-lists');
        } else {
            navigate('/login');
        }
    };

    const handleSearch = () => {
        navigate(`/search-results?query=${searchQuery}`);
    };

    return (
        <section className="flex items-center justify-center min-h-screen bg-blue-700 text-white">
            <div className="container mx-auto flex flex-col md:flex-row items-center justify-between px-6 py-12">
                <div className="md:w-1/2 mb-10 md:mb-0">
                    <img src={heroimg} alt="Hero Background" className="object-cover rounded-lg shadow-md" />
                </div>
                <div className="md:w-1/2 md:pl-10">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">Welcome to Event Management System</h1>
                    <p className="text-lg md:text-xl mb-6">Create, manage, and promote your events with ease.</p>
                    <div className="flex mb-6">
                        <input
                            type="text"
                            placeholder="Search for events..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="bg-white text-blue-500 px-4 py-2 rounded-l-md focus:outline-none"
                        />
                        <button
                            onClick={handleSearch}
                            className="bg-blue-500 text-white px-6 py-2 rounded-r-md hover:bg-blue-600 transition duration-300"
                        >
                            Search
                        </button>
                    </div>
                    <button
                        onClick={handleButtonClick}
                        className="bg-white text-blue-500 px-6 py-3 rounded-md font-semibold hover:bg-blue-100 transition duration-300"
                    >
                        {isLoggedIn ? 'Explore Events' : 'Get Started'}
                    </button>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
