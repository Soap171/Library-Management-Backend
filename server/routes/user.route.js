import express from "express";
import { verifyToken } from "../utils/verifyToken.js";
import {
  getAllBooks,
  getBookByName,
  createReservation,
  viewReservations,
} from "../controllers/user.controller.js";

const route = express.Router();

route.get("/books/search", verifyToken, getBookByName);
route.get("/books", verifyToken, getAllBooks);
route.post("/book/reservation", verifyToken, createReservation);
route.get("/book/reservation", verifyToken, viewReservations);

export default route;
