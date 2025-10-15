const express = require('express');
const router = express.Router();
const User = require('../models/User');


router.post('/add-user', async (req, res) => {
  try {
    const { name, email } = req.body;
    const newUser = new User({ name, email });
    await newUser.save();
    res.status(201).json({ message: 'User created successfully', user: newUser });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


router.get('/all-users', async (req, res) => {
  try {
    const users = await User.find().populate('rentedBooks', 'title author genre');
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
