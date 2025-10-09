const fs = require("fs");
const path = require("path");

const DB_FILE = path.join(__dirname, "../db.json");

function getBooks() {
  const data = fs.readFileSync(DB_FILE, "utf-8");
  return JSON.parse(data).books;
}

function saveBooks(books) {
  fs.writeFileSync(DB_FILE, JSON.stringify({ books }, null, 2));
}

module.exports = { getBooks, saveBooks };
