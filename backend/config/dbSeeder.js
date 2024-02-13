const { Job } = require('../models/models');
const connectDB = require('./db');
const data = require('../data.json');

const seedDatabase = async () => {
  try {
    const conn = await connectDB(); // Connect when importing
    await Job.insertMany(data);

    await conn.disconnect(); // Disconnect using the connection object
    console.log('Seeding complete!');
  } catch (error) {
    console.error('Error seeding database:', error);
  }
};

seedDatabase();