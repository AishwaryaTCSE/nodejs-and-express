const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).json({
    name: 'John Doe',
    email: 'johndoe@example.com',
    phone: '+91-9876543210'
  });
});

module.exports = router;
