
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

export const deleteExam = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Exam ID is required"
      });
    }

    const deletedExam = await Exam.findByIdAndDelete(id);
    
    if (!deletedExam) {
      return res.status(404).json({
        success: false,
        message: "Exam record not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Exam record deleted successfully"
    });
  } catch (err) {
    console.error("Error deleting exam:", err);
    res.status(500).json({
      success: false,
      message: "Error deleting exam record"
    });
  }
};

export const updateExam = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, registrationNumber, className, marks, email } = req.body;
    
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Exam ID is required"
      });
    }

    if (!name || !registrationNumber || !className || !marks) {
      return res.status(400).json({
        success: false,
        message: "Please fill out all required fields!"
      });
    }

    const updatedExam = await Exam.findByIdAndUpdate(
      id,
      { name, registrationNumber, className, marks: parseInt(marks), email },
      { new: true, runValidators: true }
    );
    
    if (!updatedExam) {
      return res.status(404).json({
        success: false,
        message: "Exam record not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Exam record updated successfully",
      exam: updatedExam
    });
  } catch (err) {
    console.error("Error updating exam:", err);
    res.status(500).json({
      success: false,
      message: "Error updating exam record"
    });
  }
};
