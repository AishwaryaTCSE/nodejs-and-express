const { getBooks, saveBooks } = require("../models/bookModel");
const logTransaction = require("../middlewares/transactionLogger");

function getAvailableBooks(req, res) {
  const books = getBooks();
  const availableBooks = books.filter(b => b.status === "available");
  res.json(availableBooks);
}

function borrowBook(req, res) {
  const books = getBooks();
  const book = books.find(b => b.id === parseInt(req.params.id));
  if (!book) return res.status(404).json({ error: "Book not found" });
  if (book.status === "borrowed") return res.status(400).json({ error: "Book is already borrowed" });

  const { readerName } = req.body;
  if (!readerName) return res.status(400).json({ error: "Reader name is required" });

  book.status = "borrowed";
  book.borrowedBy = readerName;
  book.borrowedDate = new Date().toISOString();

  saveBooks(books);
  logTransaction("borrowed", readerName, book.title);

  res.json(book);
}

function returnBook(req, res) {
  const books = getBooks();
  const book = books.find(b => b.id === parseInt(req.params.id));
  if (!book) return res.status(404).json({ error: "Book not found" });
  if (book.status === "available") return res.status(400).json({ error: "Book is not borrowed" });

  const { readerName } = req.body;
  if (!readerName) return res.status(400).json({ error: "Reader name is required" });

  book.status = "available";
  book.borrowedBy = null;
  book.borrowedDate = null;

  saveBooks(books);
  logTransaction("returned", readerName, book.title);

  res.json(book);
}

module.exports = { getAvailableBooks, borrowBook, returnBook };
