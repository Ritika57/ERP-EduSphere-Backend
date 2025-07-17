import { handleValidationError } from "../middlewares/errorHandler.js";
import {Admin } from "../models/adminRegisterSchema.js";
import { Student } from "../models/usersSchema.js";
import { Teacher } from "../models/usersSchema.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const adminSignIn = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      handleValidationError("Please provide email and password", 400);
    }
    const existingAdmin = await Admin.findOne({ email });

    if (!existingAdmin) {
      return res.status(401).json({ success: false, message: "Invalid email or password" });
    }
    const isPasswordValid = await existingAdmin.isValidPassword(password);

    if (!isPasswordValid) {
      return res.status(401).json({ success: false, message: "Invalid email or password" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: existingAdmin._id, email: existingAdmin.email },
      process.env.SECRET_KEY,
      { expiresIn: "7d" }
    );

    res.status(200).json({
      success: true,
      message: "Admin signed in successfully",
      token,
      admin: {
        id: existingAdmin._id,
        email: existingAdmin.email,
        name: existingAdmin.name || '',
        phone: existingAdmin.phone || '',
        address: existingAdmin.address || '',
        qualification: existingAdmin.qualification || ''
      }
    });
  } catch (err) {
    next(err);
  }
};

// Middleware to get admin from JWT
export const getAdminFromToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ success: false, message: "No token provided" });
  }
  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.admin = await Admin.findById(decoded.id);
    if (!req.admin) {
      return res.status(401).json({ success: false, message: "Admin not found" });
    }
    next();
  } catch (err) {
    return res.status(401).json({ success: false, message: "Invalid token" });
  }
};

// GET /api/v1/admin/profile
export const getAdminProfile = async (req, res, next) => {
  try {
    const admin = req.admin;
    res.status(200).json({
      success: true,
      admin: {
        id: admin._id,
        email: admin.email,
        name: admin.name || '',
        phone: admin.phone || '',
        address: admin.address || '',
        qualification: admin.qualification || ''
      }
    });
  } catch (err) {
    next(err);
  }
};

// PUT /api/v1/admin/profile
export const updateAdminProfile = async (req, res, next) => {
  try {
    const admin = req.admin;
    const { email, password, name, phone, address, qualification } = req.body;
    if (email) admin.email = email;
    if (password) admin.password = password;
    if (name !== undefined) admin.name = name;
    if (phone !== undefined) admin.phone = phone;
    if (address !== undefined) admin.address = address;
    if (qualification !== undefined) admin.qualification = qualification;
    await admin.save();
    res.status(200).json({
      success: true,
      admin: {
        id: admin._id,
        email: admin.email,
        name: admin.name || '',
        phone: admin.phone || '',
        address: admin.address || '',
        qualification: admin.qualification || ''
      }
    });
  } catch (err) {
    next(err);
  }
};


export const studentSignIn = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(400).json({ success: false, message: "Please provide email and password" });
    }

    const existingStudent = await Student.findOne({ email });
    if (!existingStudent) {
      return res.status(401).json({ success: false, message: "Invalid email or password" });
    }

    const isPasswordValid = await existingStudent.isValidPassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({ success: false, message: "Invalid email or password" });
    }

    res.status(200).json({
      success: true,
      message: "Student signed in successfully",
      student: {
        id: existingStudent._id,
        email: existingStudent.email,
        registrationNumber: existingStudent.registrationNumber,
        name: existingStudent.name,
        grade: existingStudent.grade
      }
    });
  } catch (err) {
    next(err);
  }
};

export const teacherSignIn = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(400).json({ success: false, message: "Please provide email and password" });
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
      message: "Teacher signed in successfully",
    });
  } catch (err) {
    next(err);
  }
};

