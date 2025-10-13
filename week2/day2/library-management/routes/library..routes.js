const express = require('express');
const router = express.Router();
const controller = require('../controllers/library.controller');
const { validateBookData, checkBorrowLimit } = require('../middleware/library.middleware');

// Routes
router.post('/books', validateBookData, controller.addBook);
router.patch('/borrow/:id', checkBorrowLimit, controller.borrowBook);
router.patch('/return/:id', controller.returnBook);
router.get('/books', controller.getBooks);
router.delete('/books/:id', controller.deleteBook);

module.exports = router;
