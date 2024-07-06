import express from "express";
import {
  register,
  login,
  logout,
  google,
  passwordReset,
} from "../controllers/auth.controller.js";

const route = express.Router();

route.post("/login", login);
route.post("/register", register);
route.post("/logout", logout);
route.post("/reset", passwordReset);
route.post("/google", google);
export default route;
