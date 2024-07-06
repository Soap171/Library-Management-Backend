import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { errorHandle } from "../utils/error.js";

dotenv.config();

const JWT_SECRET_KEY = process.env.JWT_SECRET;

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;

  if (!authHeader.startsWith("Bearer ")) {
    return next(errorHandle(401, "Unauthorized"));
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET_KEY);
    req.userId = decoded.userId;
    req.userRole = decoded.role;
    console.log("Decoded userId:", req.userId, "Decoded role:", req.userRole);
    next();
  } catch (error) {
    console.error("Token verification error:", error.message);
    return next(errorHandle(401, "Unauthorized"));
  }
};
