import Student from "../models/studentSchema.js";
import { Student as StudentUser } from "../models/usersSchema.js";
import { handleValidationError } from "../middlewares/errorHandler.js";

export const createStudent = async (req, res, next) => {
  console.log(req.body);
  const { name, registrationNumber, grade, email, password } = req.body;
  try {
   if (!name || !registrationNumber || !grade || !email || !password) {
    return res.status(400).json({ success: false, message: "Please Fill Full Form!" });
  }
  
  // Create student record
  const student = await Student.create({ name, registrationNumber, grade, email });
  
  // Create user account for authentication
  await StudentUser.create({ email, password });
  
  res.status(200).json({
    success: true,
    message: "Student Created!",
    student,
  });   
} catch (err) {
  next(err);
} 
};

export const getAllStudents = async (req, res, next) => {
  try {
   const students = await Student.find();
  res.status(200).json({
    success: true,
    students,
  });   
} catch (err) {
  next(err);
}
};

export const getStudentCount = async (req, res, next) => {
  try {
    const count = await Student.countDocuments();
    res.status(200).json({ count });
  } catch (err) {
    next(err);
  }
};



