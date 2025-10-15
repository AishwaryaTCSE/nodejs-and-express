const express = require('express');
const router = express.Router();
const Profile = require('../models/Profile');
const User = require('../models/User');

router.post('/add-profile', async (req, res) => {
    try {
        const { bio, socialMediaLinks, user } = req.body;
        const existingUser = await User.findById(user);
        if (!existingUser) return res.status(404).json({ error: 'User not found' });
        r
        const existingProfile = await Profile.findOne({ user });
        if (existingProfile) return res.status(400).json({ error: 'Profile already exists for this user' });

        const newProfile = new Profile({ bio, socialMediaLinks, user });
        await newProfile.save();

        res.status(201).json({ message: 'Profile created', profile: newProfile });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.get('/profiles', async (req, res) => {
    try {
        const profiles = await Profile.find().populate('user', 'name email');
        res.json(profiles);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
