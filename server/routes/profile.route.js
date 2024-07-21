import express from "express";
import { verifyToken } from "../utils/verifyToken.js";
import {
  updateProfile,
  viewProfile,
} from "../controllers/profile.controller.js";

const route = express.Router();

route.put("/update/:id", verifyToken, updateProfile);
route.get("/:id", verifyToken, viewProfile);

export default route;
