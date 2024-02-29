const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB is connected at ${conn.connection.host}`);
    return conn; 
  } catch (error) {
    console.error('Error connecting to the database:', error.message);
    throw error; 
  }
};

module.exports = connectDB;
