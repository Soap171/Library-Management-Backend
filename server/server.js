import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.route.js";
import updateRoutes from "./routes/updateProfile.route.js";
const app = express();

// Middleware
dotenv.config();
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/profile", updateRoutes);

const PORT = process.env.PORT || 3000;

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
