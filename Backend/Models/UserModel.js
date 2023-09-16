import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
  },

  password: {
    type: String,
    required: true,
  },

  role: {
    type: String,
    enum: ["User", "Admin"],
    default: "User",
  },

  myAnswers: {
    type: [Object],
  },
});

export default mongoose.model("User", userSchema);
