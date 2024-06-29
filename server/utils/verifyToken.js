import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { errorHandle } from "../utils/error.js";

dotenv.config();

const JWT_SECRET_KEY = process.env.JWT_SECRET;

export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;

  console.log("Token from cookies:", token); // Check if token is correctly retrieved

  if (!token) {
    console.log("Token not found");
    return next(errorHandle(401, "Unauthorized"));
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET_KEY);
    req.userId = decoded.userId;
    console.log("Decoded userId:", req.userId); // Check if userId is correctly decoded
    next();
  } catch (error) {
    console.error("Token verification error:", error.message);
    return next(errorHandle(401, "Unauthorized"));
  }
};
