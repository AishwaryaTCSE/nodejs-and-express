const mongoose = require('mongoose');

const connectDB = () => {
  mongoose.connect('mongodb://127.0.0.1:27017/libraryDB');

  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'Connection error:'));
  db.once('open', () => {
    console.log('MongoDB connected successfully!');
  });
};

module.exports = connectDB;
