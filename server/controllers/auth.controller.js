import bcypt from "bcryptjs";
import { errorHandle } from "../utils/error.js";
import User from "../models/user.schema.js";

export const login = async (req, res, next) => {
  res.send("This is login");
};

export const register = async (req, res, next) => {
  const {
    username,
    password,
    email,
    firstName,
    lastName,
    address,
    phoneNumber,
  } = req.body;

  if (
    !username ||
    !password ||
    !email ||
    !firstName ||
    !lastName ||
    !address ||
    !phoneNumber
  ) {
    return next(errorHandle(401, "Please fill in all fields"));
  }

  try {
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) return next(errorHandle(401, "User already exists"));

    const hashedPassword = await bcypt.hash(password, 10);

    const newUser = new User({
      username,
      password: hashedPassword,
      email,
      firstName,
      lastName,
      address,
      phoneNumber,
    });
    await newUser.save();
    return res.status(201).json(newUser);
  } catch (error) {
    //return next(error);
    console.log(error);
  }
};

export const google = async (req, res, next) => {
  res.send("This is Google");
};

export const logout = async (req, res, next) => {
  res.send("This is log out");
};
