const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    minlength: [3, 'Title must be at least 3 characters long']
  },
  author: {
    type: String,
    required: [true, 'Author is required']
  },
  status: {
    type: String,
    enum: ['available', 'borrowed'],
    default: 'available'
  },
  borrowers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Member'
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

bookSchema.pre('save', function(next) {
  if (this.status === 'borrowed' && this.borrowers.length === 0) {
    return next(new Error('Cannot mark book as borrowed without a borrower.'));
  }
  next();
});

bookSchema.post('save', function(doc) {
  if (doc.status === 'available') {
    console.log(`Book "${doc.title}" is now available.`);
  }
});

module.exports = mongoose.model('Book', bookSchema);
