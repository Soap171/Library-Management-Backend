import express from "express";
import { verifyToken } from "../utils/verifyToken.js";
import { updateProfile } from "../controllers/update.profile.js";

const route = express.Router();

route.put("/update", verifyToken, updateProfile);

export default route;
