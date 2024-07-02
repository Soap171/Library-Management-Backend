import { errorHandle } from "../utils/error.js";
import Book from "../models/book.schema.js";
import User from "../models/user.schema.js";
import Publisher from "../models/publisher.schema.js";
import mongoose from "mongoose";

export const viewAllBooks = async (req, res, next) => {};

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
    let publisher = await Publisher.findOne({ name: publisherName });

    if (!publisher) {
      publisher = new Publisher({
        name: publisherName,
        address: publisherAddress,
        contactNumber: publisherContactNumber,
      });

      await publisher.save();
    }

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

  // Check if the id is a valid ObjectId
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

export const deleteBook = async (req, res, next) => {};

export const viewAllUsers = async (req, res, next) => {
  try {
    const users = await User.find().select("-password");
    console.log(users);
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

export const deletePublisher = async (req, res, next) => {
  const { id } = req.body;
  try {
    const publisher = await Publisher.findByIdAndDelete(_id);
    res.status(200).json(publisher);
  } catch (error) {
    next(error);
  }
};
