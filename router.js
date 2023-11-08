// This module will handle all the routes for APIs related to book keeping

const routerBook = require('express').Router();
const bookController = require('./controller.js');

// To get all books 
routerBook.get("/",bookController.getAllBooks);

// To create a new book
routerBook.post("/", bookController.createNewBook);

// To view details of a specific book
routerBook.get("/:id",bookController.getBookDetails);

// To update specific book
routerBook.put("/:id",bookController.updateBook);

// To delete a specific book
routerBook.delete("/:id",bookController.deleteBook);

module.exports = routerBook;