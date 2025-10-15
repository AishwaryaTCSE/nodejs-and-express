const Book = require('../models/bookModel');
const Author = require('../models/authorModel')

exports.createBook = async (req, res) => {
  try {
    const author = await Author.findById(req.body.author);
    if (!author) return res.status(404).json({ message: 'Author not found' });

    const book = await Book.create(req.body);
    author.books.push(book._id);
    await author.save();

    res.status(201).json(book);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getAllBooks = async (req, res) => {
  try {
    const { genre, author } = req.query;
    const filter = {};
    if (genre) filter.genres = genre;
    if (author) filter.author = author;

    const books = await Book.find(filter).populate('author');
    res.json(books);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id).populate('author');
    if (!book) return res.status(404).json({ message: 'Book not found' });
    res.json(book);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!book) return res.status(404).json({ message: 'Book not found' });
    res.json(book);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: 'Book not found' });

    const author = await Author.findById(book.author);
    if (author) {
      author.books.pull(book._id);
      await author.save();
    }

    await book.remove();
    res.json({ message: 'Book deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
