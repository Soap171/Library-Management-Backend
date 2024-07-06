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
      expiresIn: "30s",
    });

    const refresh_token = jwt.sign({ userId: user.id }, JWT_SECRET, {
      expiresIn: "1h",
    });
    const { password: pass, ...rest } = user._doc;

    res
      .status(200)
      .cookie("jwt", refresh_token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
      })
      .json({ token });
  } catch (error) {
    return next(error);
  }
};

export const refresh = async (req, res, next) => {
  const refresh_token = req.cookies.jwt;

  if (!refresh_token) return next(errorHandle(401, "Unauthorized"));

  try {
    const { userId } = jwt.verify(refresh_token, JWT_SECRET);
    const user = await User.findById(userId);
    const newToken = jwt.sign(
      { userId: user.id, role: user.role },
      JWT_SECRET,
      { expiresIn: "15s" }
    );
    res.json({ token: newToken });
  } catch (error) {
    next(error);
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
  res.send("This is Google");
};

export const logout = async (req, res, next) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(204);
  res.cookie("jwt", "", { httpOnly: true, expires: new Date(0) });
  res.status(201).json({ message: "Logged out" });
};
