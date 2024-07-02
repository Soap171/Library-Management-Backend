import { errorHandle } from "../utils/error.js";
import Book from "../models/book.schema.js";
import User from "../models/user.schema.js";

export const viewAllBooks = async (req, res, next) => {};

export const addBook = async (req, res, next) => {};

export const updateBook = async (req, res, next) => {};

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
