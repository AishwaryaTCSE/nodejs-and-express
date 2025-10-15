const mongoose = require('mongoose');

const authorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  bio: String,
  books: [mongoose.Schema.Types.ObjectId] 
});

module.exports = mongoose.model('Author', authorSchema);
