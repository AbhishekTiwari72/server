require('dotenv').config();
const mongoose = require('mongoose');
const app = require('./app');
require('./jobs/cronJobs'); // Import the cron jobs

const PORT = process.env.PORT ;
const MONGO_URI = process.env.MONGO_URI;

const startServer = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  }
};

startServer();
