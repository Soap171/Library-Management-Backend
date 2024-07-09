import express from "express";
import { verifyToken } from "../utils/verifyToken.js";
import {
  getAllBooks,
  getBookByName,
  createReservation,
  viewReservations,
  deleteReservation,
} from "../controllers/user.controller.js";

const route = express.Router();

route.get("/books/search", verifyToken, getBookByName); // search a book by it's name
route.get("/books", verifyToken, getAllBooks); // view all books
route.post("/book/reservation", verifyToken, createReservation); // create a reservation for a book
route.get("/book/reservation", verifyToken, viewReservations); // view all reservations
route.delete("/book/reservation/:id", verifyToken, deleteReservation); // delete a reservation

export default route;
