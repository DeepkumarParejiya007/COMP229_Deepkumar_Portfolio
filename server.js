const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT;

// Middleware for JSON parsing
app.use(express.json());

// Test endpoint
app.get('/', (req, res) => {
  res.send('{"message": "Welcome to Dress Store application."}');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

const connectDB = async () => {
    try {
      await mongoose.connect(process.env.MONGO_URI);
      console.log('Connected to MongoDB');
    } catch (error) {
      console.error('Error connecting to MongoDB:', error.message);
      process.exit(1); // Exit process with failure
    }
};  
connectDB();

const contacts = require('./routes/contacts.route');
const users = require('./routes/users.routes');

// Use routes
app.use('/api/contacts', contacts);
app.use('/api/users', users);



  