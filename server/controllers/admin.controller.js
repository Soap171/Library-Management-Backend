import { errorHandle } from "../utils/error.js";
import Book from "../models/book.schema.js";
import User from "../models/user.schema.js";
import Publisher from "../models/publisher.schema.js";
import mongoose from "mongoose";
import Reservation from "../models/reservation.schema.js";

// Books related functions
export const viewAllBooks = async (req, res, next) => {
  try {
    const books = await Book.find();
    if (!books) return next(errorHandle(404, "No books found"));

    res.status(200).json(books);
  } catch (error) {
    next(error);
  }
};

export const viewBook = async (req, res, next) => {
  const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id))
    return next(errorHandle(400, "Invalid book ID"));

  try {
    const book = await Book.findById({ _id: id });
    if (!book) return next(errorHandle(404, "No book found"));
    res.status(200).json(book);
  } catch (error) {
    next(error);
  }
};

export const addBook = async (req, res, next) => {
  const {
    title,
    author,
    category,
    publisherName,
    publisherAddress,
    publisherContactNumber,
    yearPublished,
    copiesAvailable,
    totalCopies,
  } = req.body;

  try {
    const book = await Book.findOne({ title });
    if (book) return next(errorHandle(400, "Book already exists"));

    const publisher = await Publisher.findOne({ name: publisherName });

    if (!publisher) {
      publisher = new Publisher({
        name: publisherName,
        address: publisherAddress,
        contactNumber: publisherContactNumber,
      });

      await publisher.save();
    }

    const author = await Au;

    const newBook = new Book({
      title,
      author,
      category,
      publisher: publisher._id,
      yearPublished,
      copiesAvailable: copiesAvailable || 1,
      totalCopies: totalCopies || 1,
    });

    await newBook.save();
    res
      .status(201)
      .json({ message: "Book created successfully", book: newBook });
  } catch (error) {
    next(error);
  }
};

export const updateBook = async (req, res, next) => {
  const id = req.params.id;
  const { copiesAvailable } = req.body;
  console.log(id);

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return next(errorHandle(400, "Invalid book ID"));
  }

  if (!copiesAvailable)
    return next(errorHandle(401, "Available copies is required"));

  try {
    const book = await Book.findById({ _id: id });

    if (!book) return next(errorHandle(404, "Book not found"));

    book.copiesAvailable = copiesAvailable || book.copiesAvailable;

    await book.save();
    res.status(200).json({ message: "Book updated successfully", book });
  } catch (error) {
    next(error);
  }
};

export const deleteBook = async (req, res, next) => {
  const id = req.params.id; // Directly access req.params.id

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return next(errorHandle(400, "Invalid book ID"));
  }
  try {
    const result = await Book.deleteOne({ _id: id });
    if (result.deletedCount === 0)
      return next(errorHandle(404, "Book not found"));

    res.status(200).json({ message: "Book deleted successfully" });
  } catch (error) {
    next(error);
  }
};

export const sortBooksByPublisher = async (req, res, next) => {
  const publisherName = req.query.q;

  try {
    if (!publisherName || !publisherName.trim()) {
      return next(errorHandle(400, "Publisher name is required"));
    }

    const publisher = await Publisher.findOne({
      name: { $regex: new RegExp(publisherName, "i") },
    });

    if (!publisher) {
      return next(errorHandle(404, "Publisher not found"));
    }

    const books = await Book.find({ publisher: publisher._id })
      .sort({ title: 1 })
      .populate("publisher", "name");

    if (books.length === 0) {
      return next(errorHandle(404, "No books found for this publisher"));
    }

    res.status(200).json(books);
  } catch (error) {
    next(error);
  }
};

export const searchBooksByAuthor = async (req, res, next) => {
  const author = req.query.q;

  try {
    if (!author || !author.trim()) {
      return next(errorHandle(400, "Author name is required"));
    }

    const books = await Book.find({
      author: { $regex: new RegExp(author, "i") },
    }).sort({ title: 1 });

    if (books.length === 0) {
      return next(errorHandle(404, "No books found for this author"));
    }

    res.status(200).json(books);
  } catch (error) {
    next(error);
  }
};

export const lendBook = async (req, res, next) => {};

export const viewAllReservations = async (req, res, next) => {
  try {
    const reservations = await Reservation.find()
      .populate("user", "user username")
      .populate("book", "title");

    if (reservations.length === 0) {
      return next(errorHandle(404, "No reservations found"));
    }

    res.status(200).json(reservations);
  } catch (error) {
    next(error);
  }
};

export const viewBookReservations = async (req, res, next) => {
  const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id))
    return next(errorHandle(400, "Invalid book ID"));

  try {
    const reservations = await Reservation.find({ book: id })
      .populate("user", "username")
      .populate("book", "title");

    if (reservations.length === 0) {
      return next(errorHandle(404, "No reservations found for this book"));
    }

    res.status(200).json(reservations);
  } catch (error) {
    next(error);
  }
};

// end of Book related functions

// User related functions
export const viewAllUsers = async (req, res, next) => {
  try {
    const users = await User.find().select("-password");
    console.log(users);
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};
// end of User related functions

// Publisher related functions
export const deletePublisher = async (req, res, next) => {
  const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id))
    return next(errorHandle(400, "Invalid publisher ID"));
  try {
    const publisher = await Publisher.findByIdAndDelete({ _id: id });
    res.status(200).json(publisher);
  } catch (error) {
    next(error);
  }
};

export const addPublisher = async (req, res, next) => {
  const { name, address, contactNumber } = req.body;
  if (!name || !address || !contactNumber)
    return next(errorHandle(400, "All fields are required"));

  try {
    const publisher = await Publisher.findOne({ name });
    if (publisher) return next(errorHandle(400, "Publisher already exists"));

    const newPublisher = new Publisher({
      name,
      address,
      contactNumber,
    });

    await newPublisher.save();
    res
      .status(201)
      .json({ message: "Publisher created successfully", newPublisher });
  } catch (error) {
    next(error);
  }
};

export const viewAllPublishers = async (req, res, next) => {
  try {
    const publishers = await Publisher.find();
    if (!publishers) return next(errorHandle(404, "No publishers found"));

    res.status(200).json(publishers);
  } catch (error) {
    next(error);
  }
};

export const viewPublisher = async (req, res, next) => {
  const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id))
    return next(errorHandle(400, "Invalid publisher ID"));

  try {
    const publisher = await Publisher.findById({ _id: id });
    if (!publisher) return next(errorHandle(404, "Publisher not found"));

    res.status(200).json(publisher);
  } catch (error) {
    next(error);
  }
};
// end of Publisher related functions
