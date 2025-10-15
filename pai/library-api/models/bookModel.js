const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  summary: String,
  publishedDate: Date,
  author: mongoose.Schema.Types.ObjectId, 
  genres: [String],
  copiesAvailable: { type: Number, default: 1 }
});

module.exports = mongoose.model('Book', bookSchema);
