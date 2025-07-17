
import {Exam} from "../models/examSchema.js";
import { handleValidationError } from "../middlewares/errorHandler.js";

export const addExam = async (req, res, next) => {
  const { name, registrationNumber, className, marks , email} = req.body;
  try {
    if (!name || !registrationNumber || !className || !marks) {
      handleValidationError("Please fill out all fields!", 400);
    }
    const newExam = await Exam.create({ name, registrationNumber, className, marks, email });
    res.status(200).json({
      success: true,
      message: "A new exam has been added!",
      exam: newExam,
    });
  } catch (err) {
    next(err);
  }
};

export const getAllExams = async (req, res, next) => {
  try {
    const exams = await Exam.find();
    res.status(200).json({
      success: true,
      exams,
    });
  } catch (err) {
    next(err);
  }
};
