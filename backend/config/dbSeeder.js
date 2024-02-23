const { Job } = require('../models/models');
const connectDB = require('./db');
const data = require('../data.json');
require('dotenv').config()


const seedDatabase = async () => {
  try {
    const conn = await connectDB(process.env.MONG_URI); // Connect when importing
    await Job.deleteMany();
    await Job.insertMany(data);

    await conn.disconnect(); // Disconnect using the connection object
    console.log('Seeding complete!');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1)
  }
};

seedDatabase();