const Library = require('../models/library.model');

// Validate book data when adding a new book
async function validateBookData(req, res, next) {
  const { title, author } = req.body;
  if (!title || !author) {
    return res.status(400).json({ message: 'Incomplete Data', details: 'Title and author are required' });
  }
  next();
}

// Borrowing limit check — max 3 active borrowed books per user
async function checkBorrowLimit(req, res, next) {
  const { borrowerName } = req.body;
  if (!borrowerName) {
    return res.status(400).json({ message: 'Incomplete Data', details: 'Borrower name required' });
  }

  const count = await Library.countDocuments({ borrowerName, status: 'borrowed' });
  if (count >= 3) {
    return res.status(409).json({ message: 'Borrowing limit exceeded', details: `${borrowerName} already borrowed 3 books` });
  }

  next();
}

module.exports = { validateBookData, checkBorrowLimit };
