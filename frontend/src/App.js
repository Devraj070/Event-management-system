import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import Navbar from './components/navbar/Navbar';
import HeroSection from './components/navbar/HeroSection';
import Footer from './components/navbar/Footer';
import EventDiscovery from './pages/EventDiscovery';
import Dashboard from './pages/Dashboard';
import Login from './pages/user/Login';
import Register from './pages/user/Register';
import EventList from './pages/event/EventList';
import CreateEvent from './pages/event/MakeEvent';
import UpdateEvent from './pages/event/UpdateEvent';
import UserEvents from './pages/event/UserEvents';
import BookedEvent from './pages/BookedEvent';
import SearchResults from './pages/SearchResults';
import ErrorPage from './ErrorPage';
import ContactUs from './components/navbar/ContactUs';
import AboutUs from './components/navbar/AboutUs';
import PrivacyPolicy from './components/navbar/PrivacyPolicy';
import QnA from './components/QnA';
import BothQnAandFeedback from './components/BothQnAandFeedback';

function App() {
  return (
    <>
      <Toaster />
      <Router>
        <div className="App">
          <Navbar />
          <Routes>
            <Route path="/" element={<div>
              <HeroSection /><EventList /><BothQnAandFeedback />
            </div>} />
            <Route path="/discover" element={<EventDiscovery />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/login" element={<Login />}></Route>
            <Route path="/register" element={<Register />}></Route>
            <Route path="/event-lists" element={<EventList />}></Route>
            <Route path="/create-event" element={<CreateEvent />}></Route>
            <Route path="/update-event/:id" element={<UpdateEvent />} />
            <Route path="/my-events" element={<UserEvents />} />
            <Route path="/booked-events" element={<BookedEvent />} />
            <Route path="/search-results" element={<SearchResults />} />
            <Route path="*" element={<ErrorPage />} />
            <Route path="/contact-us" element={<ContactUs />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/PrivacyPolicy" element={<PrivacyPolicy />} />
            <Route path="/QnA" element={<QnA />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </>
  );
}

export default App;

