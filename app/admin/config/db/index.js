const mongoose = require('mongoose');
require('dotenv').config();
async function connect() {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 30000,
            socketTimeoutMS: 45000,
            bufferMaxEntries: 0,
            maxPoolSize: 10
        });
        console.log('Connected to MongoDB');
    } catch (error) {
        console.log('Connect Fail!!!', error.message);
    }
}

module.exports = { connect };
