const express = require('express');
const connectDB = require('./config/db'); 
//const authorRoutes = require('./routes/authorRoutes');
const bookRoutes = require('./routes/bookRoutes');

const app = express();
connectDB();
app.use(express.json());
//app.use('/api/authors', authorRoutes); 
app.use('/api/books', bookRoutes);   

app.get('/', (req, res) => res.send('Library Management API Running'));

module.exports = app;
