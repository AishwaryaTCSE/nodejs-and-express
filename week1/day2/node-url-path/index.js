
const express = require('express');
const getFileInfo = require('./fileinfo');
const parseURL = require('./urlparser');

const app = express();
const PORT = 3000;

// Test route
app.get('/test', (req, res) => {
  res.send('Test route is working!');
});

// Route: /fileinfo
app.get('/fileinfo', (req, res) => {
  const { filepath } = req.query;
  if (!filepath) {
    return res.status(400).json({ error: 'Query parameter "filepath" is required' });
  }

  try {
    const info = getFileInfo(filepath);
    res.json(info);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Route: /parseurl
app.get('/parseurl', (req, res) => {
  const { url } = req.query;
  if (!url) {
    return res.status(400).json({ error: 'Query parameter "url" is required' });
  }

  try {
    const parsed = parseURL(url);
    res.json(parsed);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
