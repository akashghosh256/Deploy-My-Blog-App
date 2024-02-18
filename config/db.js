
const mongoose = require('mongoose');
const colors = require('colors');
const connectDB = async() => {
    try{
const conn = await mongoose.connect(process.env.DATABASE);
console.log(`Connected to MongoDB HOST: ${conn.connection.host}`.bgGreen);
    }
    catch(error){
        console.log(`Error conecting to MongoDB: ${error}`.bgRed);
    }
};
module.exports = connectDB;
