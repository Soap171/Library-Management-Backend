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
} from "../controllers/admin.controller.js";

const route = express.Router();

route.get("/users", verifyToken, checkAdmin, viewAllUsers);
route.post("/book", verifyToken, checkAdmin, addBook);
route.put("/book/:id", verifyToken, checkAdmin, updateBook);
route.get("/books", verifyToken, checkAdmin, viewAllBooks);
route.delete("/book/:id", verifyToken, checkAdmin, deleteBook);
route.post("/publisher", verifyToken, checkAdmin, addPublisher);
route.get("/publishers", verifyToken, checkAdmin, viewAllPublishers);
route.get("/publisher/:id", verifyToken, checkAdmin, viewPublisher);
export default route;
