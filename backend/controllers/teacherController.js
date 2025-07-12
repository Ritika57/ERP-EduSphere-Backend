import { Teacher } from "../models/teacherSchema.js";
import { handleValidationError } from "../middlewares/errorHandler.js";

// 👇 UPDATED: takes password too
export const createTeacher = async (req, res, next) => {
  console.log(req.body);
  const { name, email, subject, password } = req.body;
  try {
    if (!name || !email || !subject || !password) {
      handleValidationError("Please fill full form!", 400);
    }

    // Check if teacher already exists
    const existingTeacher = await Teacher.findOne({ email });
    if (existingTeacher) {
      return res.status(400).json({ success: false, message: "Teacher already exists" });
    }

    const newTeacher = await Teacher.create({ name, email, subject, password });
    res.status(200).json({
      success: true,
      message: "Teacher created!",
      teacher: newTeacher
    });
  } catch (err) {
    next(err);
  }
};

export const getAllTeachers = async (req, res, next) => {
  try {
    const teachers = await Teacher.find();
    res.status(200).json({
      success: true,
      teachers
    });
  } catch (err) {
    next(err);
  }
};

// ✅ NEW: SignIn controller
export const teacherSignIn = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      handleValidationError("Please provide email and password", 400);
    }

    const existingTeacher = await Teacher.findOne({ email });
    if (!existingTeacher) {
      return res.status(401).json({ success: false, message: "Invalid email or password" });
    }

    const isPasswordValid = await existingTeacher.isValidPassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({ success: false, message: "Invalid email or password" });
    }

    res.status(200).json({
      success: true,
      message: "Teacher signed in successfully"
    });
  } catch (err) {
    next(err);
  }
};
