const express = require("express");
const router = express.Router();
const { getAllBooks, addBook, updateBook, deleteBook } = require("../controllers/adminController");

router.get("/books", getAllBooks);
router.post("/books", addBook);
router.patch("/books/:id", updateBook);
router.delete("/books/:id", deleteBook);

module.exports = router;
