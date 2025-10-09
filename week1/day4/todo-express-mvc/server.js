// server.js
const express = require('express');
const app = express();
const todoRoutes = require('./routes/todoRoutes');

// Middleware
app.use(express.json());

// Routes
app.use('/todos', todoRoutes);

// Health check
app.get('/', (req, res) => res.send('Todo API is up'));

// 404 for undefined routes
app.use((req, res, next) => {
  res.status(404).json({ error: '404 Not Found' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Internal Server Error' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))