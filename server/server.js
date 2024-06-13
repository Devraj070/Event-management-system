// server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const events = require('./routes/events');
const booking = require('./routes/Booking');
const userRoutes = require('./routes/UserRoutes');
const search = require('./routes/search');
const contact = require('./routes/ContactUs')



const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(bodyParser.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));


app.use('/api/events', events);
app.use('/api/bookings', booking);
app.use('/api/users', userRoutes);
app.use('/api/search', search);
app.use('/api/contact', contact);




const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));
