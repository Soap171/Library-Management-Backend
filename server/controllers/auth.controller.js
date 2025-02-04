import bcypt from "bcryptjs";
import { errorHandle } from "../utils/error.js";
import User from "../models/user.schema.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;

export const login = async (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return next(errorHandle(401, "Please fill in all fields"));
  }

  try {
    const user = await User.findOne({ username });

    if (!user) return next(errorHandle(401, "Invalid username or password"));

    const isMatch = await bcypt.compare(password, user.password);
    if (!isMatch) return next(errorHandle(401, "Invalid username or password"));

    const token = jwt.sign({ userId: user.id, role: user.role }, JWT_SECRET, {
      expiresIn: "5h",
    });

    const { password: pass, ...rest } = user._doc;

    res
      .status(200)
      .cookie("access_token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 1000 * 60 * 60 * 5,
      })
      .json({ rest });
  } catch (error) {
    return next(error);
    console.log(error);
  }
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
    role,
  } = req.body;

  console.log(req.body);

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
    if (existingUser)
      return next(
        errorHandle(401, "User already exists Check your username and email")
      );

    const hashedPassword = await bcypt.hash(password, 10);

    const newUser = new User({
      username,
      password: hashedPassword,
      email,
      firstName,
      lastName,
      address,
      phoneNumber,
      role: role || "member",
    });
    await newUser.save();
    return res.status(201).json(newUser);
  } catch (error) {
    //return next(error);
    console.log(error);
  }
};

export const passwordReset = async (req, res, next) => {
  const { username, password, newPassword } = req.body;

  if (!username || !password) {
    return next(errorHandle(401, "Please fill in all fields"));
  }

  try {
    const user = await User.findOne({ username });
    if (!user) return next(errorHandle(401, "User does not exist"));

    const isPassword = await bcypt.compare(password, user.password);

    if (!isPassword) return next(errorHandle(401, "Invalid password"));

    const hashedPassword = await bcypt.hash(newPassword, 10);

    user.password = hashedPassword;
    await user.save();
    res.status(201).json({ message: "Password updated successfully" });
  } catch (error) {
    next(error);
  }
};

export const google = async (req, res, next) => {
  try {
  } catch (error) {}
};

export const logout = async (req, res, next) => {
  if (!req.cookies.access_token)
    return next(errorHandle(401, "User not logged in"));
  res.cookie("access_token", "", { httpOnly: true, expires: new Date(0) });
  res.status(201).json({ message: "Logged out" });
};
