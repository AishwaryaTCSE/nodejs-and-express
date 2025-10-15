const express = require('express');
const router = express.Router();
const Book = require('../models/Book');
const Member = require('../models/Member');

// Add Book
router.post('/add-book', async (req, res) => {
  try {
    const { title, author } = req.body;
    const newBook = new Book({ title, author });
    await newBook.save();
    res.status(201).json({ message: 'Book added successfully', book: newBook });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Borrow Book
router.post('/borrow-book', async (req, res) => {
  try {
    const { memberId, bookId } = req.body;

    const book = await Book.findById(bookId);
    const member = await Member.findById(memberId);

    if (!book || !member) return res.status(404).json({ error: 'Book or Member not found' });

    if (book.status === 'borrowed') {
      return res.status(400).json({ error: 'Book is already borrowed' });
    }

    // Update book and member
    book.status = 'borrowed';
    book.borrowers.push(memberId);
    member.borrowedBooks.push(bookId);

    await book.save();
    await member.save();

    res.json({ message: 'Book borrowed successfully' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Return Book
router.post('/return-book', async (req, res) => {
  try {
    const { memberId, bookId } = req.body;

    const book = await Book.findById(bookId);
    const member = await Member.findById(memberId);

    if (!book || !member) return res.status(404).json({ error: 'Book or Member not found' });

    book.borrowers = book.borrowers.filter(id => id.toString() !== memberId);
    member.borrowedBooks = member.borrowedBooks.filter(id => id.toString() !== bookId);

    // Update status
    book.status = 'available';

    await book.save();
    await member.save();

    res.json({ message: 'Book returned successfully' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get Book Borrowers
router.get('/book-borrowers/:bookId', async (req, res) => {
  try {
    const book = await Book.findById(req.params.bookId)
      .populate('borrowers', 'name email');

    if (!book) return res.status(404).json({ error: 'Book not found' });

    res.json({ book: book.title, borrowers: book.borrowers });
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


router.delete('/delete-book/:bookId', async (req, res) => {
  try {
    const bookId = req.params.bookId;
    await Member.updateMany({}, { $pull: { borrowedBooks: bookId } });
    await Book.findByIdAndDelete(bookId);
    res.json({ message: 'Book deleted and removed from members successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
