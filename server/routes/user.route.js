import express from "express";
import { verifyToken } from "../utils/verifyToken.js";
import { getBookByName } from "../controllers/user.controller.js";

const route = express.Router();

route.get("/books/search", verifyToken, getBookByName);

export default route;
