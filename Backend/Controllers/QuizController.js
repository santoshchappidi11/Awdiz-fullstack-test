import QuizModel from "../Models/QuizModel.js";
import jwt from "jsonwebtoken";
import UserModel from "../Models/UserModel.js";

export const addQuestion = async (req, res) => {
  try {
    const { question, option1, option2, option3, option4, answer } =
      req.body.questionData;
    const { token } = req.body;

    // console.log(question, option1, option2, option3, option4, answer);

    if (!question || !option1 || !option2 || !option3 || !option4 || !answer)
      return res
        .status(404)
        .json({ success: false, message: "Please fill all the fields!" });

    if (!token)
      return res
        .status(404)
        .json({ success: false, message: "Token is required!" });

    const decodedData = jwt.verify(token, process.env.JWT_SECRET);

    if (!decodedData)
      return res
        .status(404)
        .json({ success: false, message: "Invalid Token!" });

    const userId = decodedData?.userId;

    const user = await UserModel.findById(userId);

    if (user && user.role == "Admin") {
      const newQuestion = new QuizModel({
        question,
        option1,
        option2,
        option3,
        option4,
        answer,
        userId: user._id,
      });

      await newQuestion.save();

      return res.status(200).json({
        success: true,
        message: "New question added!",
        question: newQuestion,
      });
    }
    return res.status(404).json({
      success: false,
      message: "Not a valid user to add quiz question",
    });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

export const getAllQuestions = async (req, res) => {
  try {
    const { page, limit = 1 } = req.body;

    const skipValue = (parseInt(page) - 1) * parseInt(limit);
    const limitValue = parseInt(limit);

    const questions = await QuizModel.find({})
      .skip(skipValue)
      .limit(limitValue)
      .lean();

    const allQuestions = await QuizModel.find({});

    if (questions?.length) {
      return res
        .status(200)
        .json({ success: true, questions: questions, allQuestions });
    }

    return res.status(404).json({ success: false, message: "No questions!" });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

export const getYourQuestions = async (req, res) => {
  try {
    const { token } = req.body;
    if (!token)
      return res
        .status(404)
        .json({ success: false, message: "Token is required!" });

    const decodedData = jwt.verify(token, process.env.JWT_SECRET);

    if (!decodedData)
      return res
        .status(404)
        .json({ success: false, message: "Invalid Token!" });

    const userId = decodedData?.userId;

    const user = await UserModel.findById(userId);

    if (user && user.role == "Admin") {
      const questions = await QuizModel.find({ userId: user._id });

      if (questions?.length) {
        return res.status(200).json({ success: true, questions });
      }
      return res
        .status(404)
        .json({ success: false, message: "No questions found!" });
    }

    return res
      .status(404)
      .json({ success: false, message: "Not a valid user!" });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};
