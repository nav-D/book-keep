const { isValidObjectId } = require('mongoose');
const { Book } = require('./model');

const validateBookDetails = (details) => {
  for (let key of ['title', 'author']) {
    if (!details[key]) {
      const err = new Error();
      err.message = 'Missing Required Book Detail : ' + key;
      err.status = 400;
      throw err;
    }
  }
};

const checkObjectID = (id) => {
  if (!isValidObjectId(id)) {
    const err = new Error();
    err.message = `BookId (${id}) is invalid`;
    err.status = 400;
    throw err;
  }
};

const validatePaginationParams = (from, size) => {
  from = parseInt(from);
  size = parseInt(size);
  if (isNaN(from) || from < 0 || isNaN(size) || size < 1) {
    const err = new Error();
    err.message = `Pagination params should be a positive integer`;
    err.status = 400;
    throw err;
  }
};

module.exports = {
  // Get all books
  getAllBooks: async (req, res) => {
    try {
      // Pagination for easy management
      const from = req.query.from || 0;
      const size = req.query.size || 50;

      validatePaginationParams(from, size);

      // Mongoose Query
      const findQuery = { deleted_at: { $exists: false } };
      const projectFields = {
        title: 1,
        author: 1,
      };

      const total = await Book.countDocuments(findQuery);

      const books = await Book.find(findQuery, projectFields)
        .sort({ updated_at: -1 })
        .skip(from * size)
        .limit(size);

      res.status(200).send({
        data: books,
        total: total,
      });
    } catch (e) {
      console.log('Error occured during fetching books', e);
      res
        .status(e.status || 500)
        .send({ message: e.message || 'Server Error' });
    }
  },
  createNewBook: async (req, res) => {
    try {
      const bookDetails = req.body;

      // Validate the body params to make sure required parameters arrive
      validateBookDetails(bookDetails);
      const newBook = await Book.create(bookDetails);

      res.status(201).send({
        book_id: newBook.id,
      });
    } catch (e) {
      console.log('Error during creating a record for the book', e);
      res
        .status(e.status || 500)
        .send({ message: e.message || 'Server Error' });
    }
  },
  getBookDetails: async (req, res) => {
    try {
      const bookId = req.params.id;

      // Check if id is valid ObjectID
      checkObjectID(bookId);

      const bookDetails = await Book.findOne({ _id: bookId });

      if (!bookDetails) {
        res.status(404).send({ message: "Book doesn't exist in the database" });
        return;
      }
      if (bookDetails.deleted_at) {
        res
          .status(404)
          .send({ message: 'Book has been deleted from the database' });
        return;
      }
      res.status(200).send({ data: bookDetails });
    } catch (e) {
      console.log('Error Fetching Details of the book');
      res
        .status(e.status || 500)
        .send({ message: e.message || 'Server Error' });
    }
  },
  updateBook: async (req, res) => {
    try {
      const bookId = req.params.id;
      const updateDetails = req.body;

      // Check if id is valid ObjectID
      checkObjectID(bookId);

      const bookDetails = await Book.findOneAndUpdate(
        { _id: bookId, deleted_at: { $exists: false } },
        { $set: updateDetails }
      );
      if (!bookDetails) {
        res.status(404).send({ message: "Book doesn't exist" });
        return;
      }
      res.status(204).send({});
    } catch (e) {
      console.log('Error Updating Details of the book');
      res
        .status(e.status || 500)
        .send({ message: e.message || 'Server Error' });
    }
  },
  deleteBook: async (req, res) => {
    try {
      const bookId = req.params.id;
      const softDelete = req.query.soft_delete;

      // Check if id is valid ObjectID
      checkObjectID(bookId);

      // Hard delete if specified
      let bookDetails = null;
      if (softDelete === 'false') {
        bookDetails = await Book.findOneAndDelete({
          _id: bookId,
          deleted_at: { $exists: false },
        });
      } else {
        bookDetails = await Book.findOneAndUpdate(
          { _id: bookId, deleted_at: { $exists: false } },
          {
            $set: {
              deleted_at: new Date(),
            },
          }
        );
      }
      if (!bookDetails) {
        res.status(404).send({ message: "Book doesn't exist" });
        return;
      }
      res.status(204).send({});
    } catch (e) {
      console.log('Error Updating Details of the book');
      res
        .status(e.status || 500)
        .send({ message: e.message || 'Server Error' });
    }
  },
};
