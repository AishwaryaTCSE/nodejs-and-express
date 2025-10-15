const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.post('/add-user', async (req, res) => {
    try {
        const { name, email } = req.body;
        const newUser = new User({ name, email });
        await newUser.save();
        res.status(201).json({ message: 'User created', user: newUser });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;
