import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import userRouter from "./routes/User.js";
import recipeRouter from "./routes/recipe.js";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();

app.use(cors({
  origin: ["https://mern-recipy-1.onrender.com", "http://localhost:5173"],
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());

app.use("/api/recipes", recipeRouter);
app.use("/api/users", userRouter);

app.get("/", (req, res) => {
  res.send("Welcome to the Recipe API!");
});

const port = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB Atlas");
    app.listen(port, () => console.log(`Server running at https://mern-recipy-1.onrender.com:${port}`));
  })
  .catch((err) => console.error("MongoDB connection error:", err));
