import Student from "../models/studentSchema.js";
import { Student as StudentUser } from "../models/usersSchema.js";
import { handleValidationError } from "../middlewares/errorHandler.js";
import { sendStudentWelcomeEmail } from "../utils/emailService.js";

export const createStudent = async (req, res, next) => {
  console.log(req.body);
  const { name, registrationNumber, grade, email, password } = req.body;
  try {
   if (!name || !registrationNumber || !grade || !email || !password) {
    return res.status(400).json({ success: false, message: "Please Fill Full Form!" });
  }
  
  // Check if email already exists in StudentUser collection
  const existingUser = await StudentUser.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ 
      success: false, 
      message: "Email already registered. Please use a different email." 
    });
  }
  
  // Check if registration number already exists in Student collection
  const existingStudent = await Student.findOne({ registrationNumber });
  if (existingStudent) {
    return res.status(400).json({ 
      success: false, 
      message: "Registration number already exists. Please use a different registration number." 
    });
  }
  
  // Create user account for authentication first
  const studentUser = await StudentUser.create({ email, password });
  
  // Create student record
  const student = await Student.create({ name, registrationNumber, grade, email });
  
  // Send welcome email to the new student
  try {
    const studentData = {
      name,
      email,
      password, // Include the original password for the email
      registrationNumber,
      grade
    };
    
    const emailResult = await sendStudentWelcomeEmail(studentData);
    if (emailResult.success) {
      console.log("✅ Student welcome email sent successfully to:", email);
    } else {
      console.error("❌ Failed to send student welcome email:", emailResult.error);
      // Don't fail the registration if email fails, just log the error
    }
  } catch (emailError) {
    console.error("❌ Email service error:", emailError);
    // Continue with successful registration even if email fails
  }
  
  res.status(200).json({
    success: true,
    message: "Student Created Successfully!",
    student,
  });   
} catch (err) {
  console.error('Error creating student:', err);
  
  // Handle specific MongoDB errors
  if (err.code === 11000) {
    const field = Object.keys(err.keyPattern)[0];
    const message = `${field.charAt(0).toUpperCase() + field.slice(1)} already exists. Please use a different ${field}.`;
    return res.status(400).json({ success: false, message });
  }
  
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



