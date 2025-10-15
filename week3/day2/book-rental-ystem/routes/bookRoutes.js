const express = require('express');
const router = express.Router();
const Book = require('../models/Book');
const User = require('../models/User');

router.post('/add-book', async (req, res) => {
  try {
    const { title, author, genre } = req.body;
    const newBook = new Book({ title, author, genre });
    await newBook.save();
    res.status(201).json({ message: 'Book added successfully', book: newBook });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.post('/rent-book', async (req, res) => {
  try {
    const { userId, bookId } = req.body;

    const user = await User.findById(userId);
    const book = await Book.findById(bookId);

    if (!user || !book) return res.status(404).json({ error: 'User or Book not found' });


    if (user.rentedBooks.includes(bookId)) {
      return res.status(400).json({ error: 'Book already rented by this user' });
    }

    user.rentedBooks.push(bookId);
    book.rentedBy.push(userId);

    await user.save();
    await book.save();

    res.json({ message: 'Book rented successfully' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


router.post('/return-book', async (req, res) => {
  try {
    const { userId, bookId } = req.body;

    const user = await User.findById(userId);
    const book = await Book.findById(bookId);

    if (!user || !book) return res.status(404).json({ error: 'User or Book not found' });

    user.rentedBooks = user.rentedBooks.filter(id => id.toString() !== bookId);
    book.rentedBy = book.rentedBy.filter(id => id.toString() !== userId);

    await user.save();
    await book.save();

    res.json({ message: 'Book returned successfully' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get('/user-rentals/:userId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId)
      .populate('rentedBooks', 'title author genre');

    if (!user) return res.status(404).json({ error: 'User not found' });

    res.json({ user: user.name, rentedBooks: user.rentedBooks });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.get('/book-renters/:bookId', async (req, res) => {
  try {
    const book = await Book.findById(req.params.bookId)
      .populate('rentedBy', 'name email');

    if (!book) return res.status(404).json({ error: 'Book not found' });

    res.json({ book: book.title, rentedBy: book.rentedBy });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.put('/update-book/:bookId', async (req, res) => {
  try {
    const updatedBook = await Book.findByIdAndUpdate(
      req.params.bookId,
      req.body,
      { new: true }
    );
    res.json({ message: 'Book updated successfully', book: updatedBook });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete Book
router.delete('/delete-book/:bookId', async (req, res) => {
  try {
    const bookId = req.params.bookId;
    await User.updateMany({}, { $pull: { rentedBooks: bookId } });
    await Book.findByIdAndDelete(bookId);
    res.json({ message: 'Book deleted and removed from users successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
