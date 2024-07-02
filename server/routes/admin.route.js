import express from "express";
import { checkAdmin } from "../utils/checkAdmin.js";
import { verifyToken } from "../utils/verifyToken.js";
import {
  viewAllBooks,
  addBook,
  updateBook,
  deleteBook,
  viewAllUsers,
} from "../controllers/admin.controller.js";

const route = express.Router();

route.get("/users", verifyToken, checkAdmin, viewAllUsers);
route.post("/book", verifyToken, checkAdmin, addBook);
route.put("/book/:id", verifyToken, checkAdmin, updateBook);

export default route;
