const mongoose = require('mongoose');
const User = require('./models/User');
const Event = require('./models/Event');

mongoose.connect('mongodb://localhost:27017/Event-management', { useNewUrlParser: true, useUnifiedTopology: true });

const createDummyData = async () => {
    try {
        await User.deleteMany({});
        await Event.deleteMany({});

        const user = new User({ username: 'testuser' });
        await User.register(user, 'password');

        const event = new Event({
            title: 'Sample Event',
            description: 'This is a sample event.',
            date: new Date(),
            time: '10:00 AM',
            location: 'Sample Location',
            ticketPrice: 100,
            createdBy: user._id,
        });

        await event.save();
        console.log('Dummy data created');
    } catch (error) {
        console.error('Error creating dummy data:', error);
    } finally {
        mongoose.disconnect();
    }
};

createDummyData();
