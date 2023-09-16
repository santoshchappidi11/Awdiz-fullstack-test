import mongoose, { Schema } from "mongoose";

const quizSchema = new Schema({
  question: {
    type: String,
    required: true,
  },

  option1: {
    type: String,
    required: true,
  },
  option2: {
    type: String,
    required: true,
  },

  option3: {
    type: String,
    required: true,
  },

  option4: {
    type: String,
    required: true,
  },

  answer: {
    type: String,
    required: true,
  },

  userId: {
    type: String,
    userId: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

export default mongoose.model("Quiz", quizSchema);
