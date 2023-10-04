import bcrypt from "bcrypt";
import UserModel from "../Models/UserModel.js";
import jwt from "jsonwebtoken";
import QuizModel from "../Models/QuizModel.js";

export const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body.userData;

    if (!name || !email || !password || !role)
      return res
        .status(404)
        .json({ success: false, message: "All fields are required!" });

    const isEmailExists = await UserModel.find({ email });

    if (isEmailExists?.length)
      return res.status(404).json({
        success: false,
        message: "This email already exists, try another one..",
      });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new UserModel({
      name,
      email,
      password: hashedPassword,
      role,
    });

    await newUser.save();
    return res.status(200).json({
      success: true,
      message: "Registered successfully!",
      user: newUser,
    });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body.userData;

    if (!email || !password)
      return res
        .status(404)
        .json({ success: false, message: "All fields are required!" });

    const user = await UserModel.findOne({ email });

    if (user) {
      const isPasswordRight = await bcrypt.compare(password, user.password);

      if (isPasswordRight) {
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);

        const userObj = {
          name: user.name,
          email: user.email,
          role: user.role,
        };
        return res.status(200).json({
          success: true,
          message: "Login successfull!",
          user: userObj,
          token,
        });
      }

      return res
        .status(404)
        .json({ success: false, message: "Password is wrong!" });
    }

    return res
      .status(404)
      .json({ success: false, message: "Invalid credentials!" });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

export const getCurrentUser = async (req, res) => {
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

    if (user) {
      const userObj = {
        name: user.name,
        email: user.email,
        role: user.role,
      };

      return res.status(200).json({ success: true, user: userObj });
    }

    return res.status(404).json({ success: false, message: "No user found!" });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

export const submitAnswer = async (req, res) => {
  try {
    const { question, userAnswer, rightAnswer, questionId, token } = req.body;

    // console.log(question, userAnswer, rightAnswer, questionId);

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

    // console.log(user);

    if (user) {
      const singleQuestion = await QuizModel.findById(questionId);

      // console.log(singleQuestion);

      if (singleQuestion) {
        const Obj = {
          question,
          userAnswer,
          rightAnswer,
          questionId,
        };

        user.myAnswers.push(Obj);

        await user.save();
        return res
          .status(200)
          .json({ success: true, message: "Answer submitted!" });
      }
      return res.status(404).json({
        success: true,
        message: "Answer couldn't submit, something went wrong!",
      });
    }
    return res.status(404).json({ success: false, message: "No user found!" });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

export const getQuizResult = async (req, res) => {
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

    console.log(user);

    if (user) {
      if (user?.myAnswers) {
        return res
          .status(200)
          .json({ success: true, userAnswers: user.myAnswers });
      }
      return res
        .status(404)
        .json({ success: true, message: "No results to show" });
    }
    return res.status(404).json({ success: false, message: "User not found!" });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

export const takeQuizAgain = async (req, res) => {
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
        .json({ success: false, message: "Not a valid token!" });

    const userId = decodedData.userId;

    const user = await UserModel.findById(userId);

    if (user) {
      if (user?.myAnswers?.length) {
        user.myAnswers = [];
        await user.save();
        return res.status(200).json({ success: true });
      }
    }
    return res.status(404).json({ success: false, message: "No user found!" });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};
