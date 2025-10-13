const Library = require('../models/library.model');

const MS_PER_DAY = 24 * 60 * 60 * 1000;
const FEE_PER_DAY = 10; // Rs. 10/day

// Add a new book
async function addBook(req, res) {
  try {
    const { title, author } = req.body;
    const book = new Library({ title, author, status: 'available' });
    const saved = await book.save();
    res.status(201).json({ message: 'Book added successfully', data: saved });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

// Borrow a book
async function borrowBook(req, res) {
  try {
    const { borrowerName } = req.body;
    const book = await Library.findById(req.params.id);
    if (!book) return res.status(404).json({ message: 'Book not found' });
    if (book.status === 'borrowed') return res.status(409).json({ message: 'Book already borrowed' });

    const borrowDate = new Date();
    const dueDate = new Date(borrowDate.getTime() + 14 * MS_PER_DAY);

    book.status = 'borrowed';
    book.borrowerName = borrowerName;
    book.borrowDate = borrowDate;
    book.dueDate = dueDate;
    await book.save();

    res.status(200).json({ message: 'Book borrowed successfully', data: book });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

// Return a book
async function returnBook(req, res) {
  try {
    const book = await Library.findById(req.params.id);
    if (!book) return res.status(404).json({ message: 'Book not found' });
    if (book.status !== 'borrowed') return res.status(409).json({ message: 'Book is not borrowed' });

    const returnDate = new Date();
    let fees = 0;
    if (book.dueDate && returnDate > book.dueDate) {
      const daysLate = Math.ceil((returnDate - book.dueDate) / MS_PER_DAY);
      fees = daysLate * FEE_PER_DAY;
    }

    book.returnDate = returnDate;
    book.overdueFees += fees;
    book.status = 'available';
    book.borrowerName = null;
    book.borrowDate = null;
    book.dueDate = null;
    await book.save();

    res.status(200).json({ message: 'Book returned successfully', overdueFees: fees, data: book });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

// Get all books (with optional filters)
async function getBooks(req, res) {
  try {
    const { status, title } = req.query;
    const filter = {};
    if (status) filter.status = status;
    if (title) filter.title = { $regex: title, $options: 'i' };

    const books = await Library.find(filter).sort({ createdAt: -1 });
    res.status(200).json({ count: books.length, data: books });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

// Delete a book
async function deleteBook(req, res) {
  try {
    const book = await Library.findById(req.params.id);
    if (!book) return res.status(404).json({ message: 'Book not found' });
    if (book.status === 'borrowed') return res.status(409).json({ message: 'Cannot delete borrowed book' });

    await Library.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Book deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

module.exports = { addBook, borrowBook, returnBook, getBooks, deleteBook };
