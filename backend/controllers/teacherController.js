import Teacher from "../models/teacherSchema.js";
import { handleValidationError } from "../middlewares/errorHandler.js";
import { sendTeacherWelcomeEmail } from "../utils/emailService.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

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
    
    // Send welcome email to the new teacher
    try {
      const teacherData = {
        name,
        email,
        password, // Include the original password for the email
        subject
      };
      
      const emailResult = await sendTeacherWelcomeEmail(teacherData);
      if (emailResult.success) {
        console.log("✅ Teacher welcome email sent successfully to:", email);
      } else {
        console.error("❌ Failed to send teacher welcome email:", emailResult.error);
        // Don't fail the registration if email fails, just log the error
      }
    } catch (emailError) {
      console.error("❌ Email service error:", emailError);
      // Continue with successful registration even if email fails
    }
    
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

    // Generate JWT token
    const token = jwt.sign(
      { id: existingTeacher._id, email: existingTeacher.email },
      process.env.SECRET_KEY,
      { expiresIn: "7d" }
    );

    res.status(200).json({
      success: true,
      message: "Teacher signed in successfully",
      token,
      teacher: {
        id: existingTeacher._id,
        email: existingTeacher.email,
        name: existingTeacher.name || '',
        phone: existingTeacher.phone || '',
        address: existingTeacher.address || '',
        qualification: existingTeacher.qualification || '',
        subject: existingTeacher.subject || ''
      }
    });
  } catch (err) {
    next(err);
  }
};

export const getTeacherCount = async (req, res, next) => {
  try {
    const count = await Teacher.countDocuments();
    res.status(200).json({ count });
  } catch (err) {
    next(err);
  }
};

// Middleware to get teacher from JWT
export const getTeacherFromToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ success: false, message: "No token provided" });
  }
  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.teacher = await Teacher.findById(decoded.id);
    if (!req.teacher) {
      return res.status(401).json({ success: false, message: "Teacher not found" });
    }
    next();
  } catch (err) {
    return res.status(401).json({ success: false, message: "Invalid token" });
  }
};

// GET /api/v1/teacher/profile
export const getTeacherProfile = async (req, res, next) => {
  try {
    const teacher = req.teacher;
    res.status(200).json({
      success: true,
      teacher: {
        id: teacher._id,
        email: teacher.email,
        name: teacher.name || '',
        phone: teacher.phone || '',
        address: teacher.address || '',
        qualification: teacher.qualification || '',
        subject: teacher.subject || ''
      }
    });
  } catch (err) {
    next(err);
  }
};

// PUT /api/v1/teacher/profile
export const updateTeacherProfile = async (req, res, next) => {
  try {
    const teacher = req.teacher;
    const { email, password, name, phone, address, qualification, subject } = req.body;
    if (email) teacher.email = email;
    if (password) teacher.password = password;
    if (name !== undefined) teacher.name = name;
    if (phone !== undefined) teacher.phone = phone;
    if (address !== undefined) teacher.address = address;
    if (qualification !== undefined) teacher.qualification = qualification;
    if (subject !== undefined) teacher.subject = subject;
    await teacher.save();
    res.status(200).json({
      success: true,
      teacher: {
        id: teacher._id,
        email: teacher.email,
        name: teacher.name || '',
        phone: teacher.phone || '',
        address: teacher.address || '',
        qualification: teacher.qualification || '',
        subject: teacher.subject || ''
      }
    });
  } catch (err) {
    next(err);
  }
};
