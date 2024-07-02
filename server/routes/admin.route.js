import express from "express";
import { checkAdmin } from "../utils/checkAdmin.js";
import { verifyToken } from "../utils/verifyToken.js";

const route = express.Router();

route.get("/", verifyToken, checkAdmin, (req, res) => {
  res.status(200).json({ message: "Welcome Admin" });
});

export default route;
