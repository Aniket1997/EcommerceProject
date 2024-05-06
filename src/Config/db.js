const mongoose = require('mongoose');
require('dotenv').config();

const MONGO_DB_ATLUS_URL = process.env.MONGO_DB_ATLUS_URL;

const connectDB = async (options={}) => {
    try {
        await mongoose.connect(MONGO_DB_ATLUS_URL,options);
        console.log('Connected to MongoDB');
        mongoose,mongoose.connection.on('error',()=>{console.log('Error in MongoDB Connection')});
        
    } catch (err) {
        console.log('Error connecting: ', err.toString());
    }
}

module.exports = connectDB;