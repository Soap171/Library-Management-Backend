import express from "express";
import { verifyToken } from "../utils/verifyToken.js";
import {
  updateProfile,
  viewProfile,
} from "../controllers/profile.controller.js";

const route = express.Router();

route.put("/update", verifyToken, updateProfile);
route.get("/", verifyToken, viewProfile);

export default route;
