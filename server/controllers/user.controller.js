import { errorHandle } from "../utils/error.js";
import mongoose from "mongoose";
import Book from "../models/book.schema.js";
import Reservation from "../models/reservation.schema.js";
import User from "../models/user.schema.js";

// search books by it's name
export const getBookByName = async (req, res, next) => {
  const query = req.query.q;

  if (!query || !query.trim()) {
    return res.status(400).json({ error: "Search query is required" });
  }

  try {
    // Perform case-insensitive search for books whose title matches the query
    const books = await Book.find({
      title: { $regex: new RegExp(query, "i") },
    });

    if (books.length === 0) {
      return res
        .status(404)
        .json({ error: "No books found matching the query" });
    }

    res.status(200).json(books);
  } catch (error) {
    next(error); // Pass error to the global error handler
  }
};

// view all books
export const getAllBooks = async (req, res, next) => {
  try {
    const books = await Book.find();
    if (!books) {
      return next(errorHandle("No books found", 404));
    }

    res.status(200).json(books);
  } catch (error) {
    next(error);
  }
};

// create a reservation for a books
export const createReservation = async (req, res, next) => {
  const userId = req.userId; // Assuming user ID is attached to req.user
  const { bookId } = req.body;

  if (!bookId) {
    return next(errorHandle(400, "Book ID is required"));
  }

  try {
    const user = await User.findById(userId);
    const book = await Book.findById(bookId);

    if (!user) return next(errorHandle(404, "User not found"));
    if (!book) return next(errorHandle(404, "Book not found"));

    const reservation = new Reservation({
      book: bookId,
      user: userId,
    });

    await reservation.save();

    user.reservations.push(reservation._id);
    book.reservations.push(reservation._id);

    await user.save();
    await book.save();

    res
      .status(201)
      .json({ message: "Reservation created successfully", reservation });
  } catch (error) {
    next(error);
  }
};

// view personal reservations
export const viewReservations = async (req, res, next) => {
  const userId = req.userId;

  try {
    const reservations = await Reservation.find({ user: userId }).populate(
      "book",
      "title"
    );
    if (!reservations.length)
      return next(errorHandle(404, "No reservations found"));

    res.status(200).json(reservations);
  } catch (error) {
    next(error);
  }
};

// delete a reservation

export const deleteReservation = async (req, res, next) => {
  const reservationId = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(reservationId)) {
    return next(errorHandle(400, "Invalid reservation ID"));
  }

  try {
    const reservation = await Reservation.findById(reservation);
    if (!reservation) return next(errorHandle(404, "Reservation not found"));

    await Reservation.findByIdAndDelete(reservationId);
    res.status(200).json({ message: "Reservation deleted successfully" });
  } catch (error) {
    next(error);
  }
};
