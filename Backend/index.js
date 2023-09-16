import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import mongoose from "mongoose";
import {
  getCurrentUser,
  login,
  register,
  submitAnswer,
} from "./Controllers/UserController.js";
import {
  addQuestion,
  getAllQuestions,
  getYourQuestions,
} from "./Controllers/QuizController.js";

const app = express();
app.use(express.json());
dotenv.config();
app.use(cors());
app.use(morgan("dev"));

// user
app.post("/register", register);
app.post("/login", login);
app.post("/get-current-user", getCurrentUser);

// quiz
app.post("/add-question", addQuestion);
app.post("/get-all-questions", getAllQuestions);
app.post("/get-your-questions", getYourQuestions);
app.post("/submit-answer", submitAnswer);

mongoose
  .connect(
    "mongodb+srv://santosh:santosh123@cluster0.0tasyyd.mongodb.net/awdiz-fullstack-test"
  )
  .then(() => {
    console.log("connected to DB");
  });
//   .catch((error) => {
//     console.log("somthing went wrong..", error);
//   });

app.listen(8000, () => {
  console.log("listening on port 8000...");
});
