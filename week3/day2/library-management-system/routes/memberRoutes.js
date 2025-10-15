const express = require('express');
const router = express.Router();
const Member = require('../models/Member');


router.post('/add-member', async (req, res) => {
  try {
    const { name, email } = req.body;
    const newMember = new Member({ name, email });
    await newMember.save();
    res.status(201).json({ message: 'Member added successfully', member: newMember });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get('/member-borrowed-books/:memberId', async (req, res) => {
  try {
    const member = await Member.findById(req.params.memberId)
      .populate('borrowedBooks', 'title author status');

    if (!member) return res.status(404).json({ error: 'Member not found' });

    res.json({ member: member.name, borrowedBooks: member.borrowedBooks });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/all-members', async (req, res) => {
  try {
    const members = await Member.find().populate('borrowedBooks', 'title status');
    res.json(members);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
