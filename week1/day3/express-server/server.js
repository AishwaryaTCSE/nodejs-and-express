const express = require('express');
const app = express();
const PORT = 3000;

const homeRoute = require('./routes/home');
const aboutusRoute = require('./routes/aboutus');
const contactusRoute = require('./routes/contactus');

app.use('/home', homeRoute);
app.use('/aboutus', aboutusRoute);
app.use('/contactus', contactusRoute);

app.use((req, res) => {
  res.status(404).send('404 Not Found');
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
