
const express = require('express');
const logger = require('./eventLogger');
const delayMessage = require('./delay');

const app = express();
const PORT = 3000;

// Test route
app.get('/test', (req, res) => {
  res.send('Test route is working!');
});

// Route: /emit
app.get('/emit', (req, res) => {
  const { message } = req.query;
  if (!message) {
    return res.status(400).json({ error: 'Message query parameter is required' });
  }

  const timestamp = new Date().toISOString();

  // Emit log event
  logger.emit('log', { message, timestamp });

  res.json({ status: 'Event logged', timestamp });
});

// Route: /delay
app.get('/delay', async (req, res) => {
  const { message, time } = req.query;

  try {
    const result = await delayMessage(message, time);
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
