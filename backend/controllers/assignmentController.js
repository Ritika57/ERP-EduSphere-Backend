// assignmentController.js

import {
  Assignment,
  AssignmentSubmission,
} from "../models/assignmentSchema.js";
import { handleValidationError } from "../middlewares/errorHandler.js";

export const createAssignment = async (req, res, next) => {
  console.log(req.body);
  const { title, description, grade, deadline } = req.body;
  try {
    if (!title || !description || !grade || !deadline) {
      handleValidationError("Please Fill Full Form!", 400);
    }
    const assignment = await Assignment.create({ title, description, grade, deadline });
    res.status(201).json({
      success: true,
      message: "Assignment Created!",
      assignment,
    });
  } catch (err) {
    next(err);
  }
};

export const getAllAssignments = async (req, res, next) => {
  try {
    const assignments = await Assignment.find();
    res.status(200).json({
      success: true,
      assignments,
    });
  } catch (err) {
    next(err);
  }
};

export const submitAssignment = async (req, res, next) => {
  try {
    const { assignmentId, studentId, answer } = req.body;

    // Debug logging
    console.log("Received submission request:", {
      assignmentId,
      studentId,
      answer,
      body: req.body,
    });

    // Validate required fields
    if (!assignmentId || !studentId || !answer) {
      console.log("Validation failed:", {
        hasAssignmentId: !!assignmentId,
        hasStudentId: !!studentId,
        hasAnswer: !!answer,
        assignmentId,
        studentId,
        answer,
      });
      return res.status(400).json({
        success: false,
        message: "Assignment ID, Student ID, and Answer are required",
      });
    }

    // Check if assignment exists
    const assignment = await Assignment.findById(assignmentId);
    if (!assignment) {
      return res.status(404).json({
        success: false,
        message: "Assignment not found",
      });
    }

    // Check if student has already submitted this assignment
    const existingSubmission = await AssignmentSubmission.findOne({
      assignmentId: assignmentId,
      studentId: studentId,
    });

    if (existingSubmission) {
      return res.status(400).json({
        success: false,
        message: "You have already submitted this assignment",
      });
    }

    // Create new submission
    const submission = new AssignmentSubmission({
      assignmentId: assignmentId,
      studentId: studentId,
      answer: answer,
      submittedAt: new Date(),
    });

    await submission.save();

    console.log("Assignment submitted successfully:", submission._id);

    res.status(201).json({
      success: true,
      message: "Assignment submitted successfully",
      submission: {
        id: submission._id,
        assignmentId: submission.assignmentId,
        studentId: submission.studentId,
        answer: submission.answer,
        submittedAt: submission.submittedAt,
      },
    });
  } catch (err) {
    console.error("Error submitting assignment:", err);
    res.status(500).json({
      success: false,
      message: "Error submitting assignment",
    });
  }
};

export const getStudentSubmissions = async (req, res, next) => {
  try {
    const { studentId } = req.params;

    if (!studentId) {
      return res.status(400).json({
        success: false,
        message: "Student ID is required",
      });
    }

    const submissions = await AssignmentSubmission.find({ studentId })
      .populate("assignmentId", "title description")
      .sort({ submittedAt: -1 });

    res.status(200).json({
      success: true,
      submissions: submissions,
    });
  } catch (err) {
    console.error("Error fetching student submissions:", err);
    res.status(500).json({
      success: false,
      message: "Error fetching submissions",
    });
  }
};

export const deleteAssignment = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Assignment ID is required",
      });
    }

    // First, delete all submissions for this assignment
    await AssignmentSubmission.deleteMany({ assignmentId: id });

    // Then delete the assignment
    const deletedAssignment = await Assignment.findByIdAndDelete(id);

    if (!deletedAssignment) {
      return res.status(404).json({
        success: false,
        message: "Assignment not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Assignment deleted successfully",
    });
  } catch (err) {
    console.error("Error deleting assignment:", err);
    res.status(500).json({
      success: false,
      message: "Error deleting assignment",
    });
  }
};
