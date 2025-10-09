const { getBooks, saveBooks } = require("../models/bookModel");

function getAllBooks(req, res) {
  res.json(getBooks());
}

function addBook(req, res) {
  const books = getBooks();
  const { title, author, genre, publishedYear } = req.body;
  if (!title || !author || !genre || !publishedYear) {
    return res.status(400).json({ error: "Please provide all book details" });
  }

  const newBook = {
    id: books.length ? books[books.length - 1].id + 1 : 1,
    title,
    author,
    genre,
    publishedYear,
    status: "available",
    borrowedBy: null,
    borrowedDate: null
  };

  books.push(newBook);
  saveBooks(books);
  res.status(201).json(newBook);
}

function updateBook(req, res) {
  const books = getBooks();
  const book = books.find(b => b.id === parseInt(req.params.id));
  if (!book) return res.status(404).json({ error: "Book not found" });

  const { title, author, genre, publishedYear } = req.body;
  if (title) book.title = title;
  if (author) book.author = author;
  if (genre) book.genre = genre;
  if (publishedYear) book.publishedYear = publishedYear;

  saveBooks(books);
  res.json(book);
}

function deleteBook(req, res) {
  let books = getBooks();
  const book = books.find(b => b.id === parseInt(req.params.id));
  if (!book) return res.status(404).json({ error: "Book not found" });

  books = books.filter(b => b.id !== book.id);
  saveBooks(books);
  res.json({ message: "Book deleted successfully" });
}

module.exports = { getAllBooks, addBook, updateBook, deleteBook };
