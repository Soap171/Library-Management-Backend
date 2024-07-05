import express from "express";
import { checkAdmin } from "../utils/checkAdmin.js";
import { verifyToken } from "../utils/verifyToken.js";

import {
  viewAllBooks,
  addBook,
  updateBook,
  deleteBook,
  viewAllUsers,
  addPublisher,
  deletePublisher,
  viewAllPublishers,
  viewPublisher,
  sortBooksByPublisher,
  searchBooksByAuthor,
  viewBook,
} from "../controllers/admin.controller.js";

const route = express.Router();

// view users of the web applications
route.get("/users", verifyToken, checkAdmin, viewAllUsers);

// book related routes
route.post("/book", verifyToken, checkAdmin, addBook); // create a new book
route.put("/book/:id", verifyToken, checkAdmin, updateBook); // update a book
route.get("/books", verifyToken, checkAdmin, viewAllBooks); // view all books
route.get("/book/:id", verifyToken, checkAdmin, viewBook); // view a book
route.delete("/book/:id", verifyToken, checkAdmin, deleteBook); // delete a book
route.get("/books/publisher/", verifyToken, checkAdmin, sortBooksByPublisher); // search books using publisher id
route.get("/books/author", verifyToken, checkAdmin, searchBooksByAuthor); // serch books using author's name

// publisher related routes
route.post("/publisher", verifyToken, checkAdmin, addPublisher); // add a new publisher
route.get("/publishers", verifyToken, checkAdmin, viewAllPublishers); // view all publishers
route.get("/publisher/:id", verifyToken, checkAdmin, viewPublisher); // view a publisher

export default route;
