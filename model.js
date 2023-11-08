// Configure Mongoose Model for schema validation 
const mongoose = require('mongoose');

const opts = {
  timestamps: {
    createdAt: "created_at",
    updatedAt: "updated_at"
  }
}

const bookSchema = {
  title: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true,
  },
  summary: {
    type: String
  },
  deleted_at: Date
}

const bookMongooseSchema = new mongoose.Schema(bookSchema,opts);
const Book = mongoose.model('books',bookMongooseSchema);
module.exports = {
  Book
}