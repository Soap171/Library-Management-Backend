import { errorHandle } from "../utils/error.js";
import mongoose from "mongoose";
import Book from "../models/book.schema.js";

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
