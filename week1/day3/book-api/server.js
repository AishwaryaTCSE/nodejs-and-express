const express = require("express");
const fs = require("fs");
const app = express();

app.use(express.json());

const PORT = 3000;
const DB_FILE = "db.json";

function readDB() {
  const data = fs.readFileSync(DB_FILE, "utf-8");
  return JSON.parse(data);
}

function writeDB(data) {
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), "utf-8");
}

app.post("/books", (req, res) => {
  const db = readDB();
  const newBook = req.body;

  if (!newBook.title || !newBook.author || !newBook.year) {
    return res.status(400).json({ message: "Please provide title, author, and year" });
  }

  newBook.id = db.books.length ? db.books[db.books.length - 1].id + 1 : 1;
  db.books.push(newBook);
  writeDB(db);

  res.status(201).json({ message: "Book added successfully", book: newBook });
});

app.get("/books", (req, res) => {
  const db = readDB();
  res.status(200).json(db.books);
});

app.get("/books/:id", (req, res) => {
  const db = readDB();
  const id = parseInt(req.params.id);
  const book = db.books.find(b => b.id === id);

  if (!book) return res.status(404).json({ message: "Book not found" });
  res.status(200).json(book);
});


app.put("/books/:id", (req, res) => {
  const db = readDB();
  const id = parseInt(req.params.id);
  const index = db.books.findIndex(b => b.id === id);

  if (index === -1) return res.status(404).json({ message: "Book not found" });

  db.books[index] = { ...db.books[index], ...req.body };
  writeDB(db);

  res.status(200).json({ message: "Book updated successfully", book: db.books[index] });
});

app.delete("/books/:id", (req, res) => {
  const db = readDB();
  const id = parseInt(req.params.id);
  const index = db.books.findIndex(b => b.id === id);

  if (index === -1) return res.status(404).json({ message: "Book not found" });

  db.books.splice(index, 1);
  writeDB(db);

  res.status(200).json({ message: "Book deleted successfully" });
});

app.get("/books/search", (req, res) => {
  const db = readDB();
  const { author, title } = req.query;

  let results = db.books;

  if (author) {
    const lower = author.toLowerCase();
    results = results.filter(b => b.author.toLowerCase().includes(lower));
  }

  if (title) {
    const lower = title.toLowerCase();
    results = results.filter(b => b.title.toLowerCase().includes(lower));
  }

  if (results.length === 0) {
    return res.status(404).json({ message: "No books found" });
  }

  res.status(200).json(results);
});


app.use((req, res) => {
  res.status(404).json({ error: "404 Not Found" });
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
