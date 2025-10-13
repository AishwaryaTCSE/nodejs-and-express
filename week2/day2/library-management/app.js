const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const libraryRoutes = require('./routes/library.routes');

dotenv.config();
const app = express();

app.use(express.json());
app.use(morgan('dev'));

// Connect MongoDB
connectDB();

// Routes
app.use('/library', libraryRoutes);

// Error Handling
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: 'Internal Server Error', error: err.message });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
