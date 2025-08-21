
import {Admin } from "../models/adminRegisterSchema.js";
import { handleValidationError } from "../middlewares/errorHandler.js";

export const adminRegister = async (req, res, next) => {
  console.log("🔍 Admin registration request received");
  console.log("📧 Email:", req.body.email);
  console.log("🔑 Password length:", req.body.password?.length || 0);

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ success: false, message: "Please Fill Form!" });
  }

  // Add password length validation
  if (password.length < 6) {
    return res.status(400).json({ 
      success: false, 
      message: "Password must be at least 6 characters long" 
    });
  }

  try {
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ success: false, message: "Admin already exists" });
    }

    const newAdmin = await Admin.create({ email, password });
    console.log("Admin created successfully:", newAdmin._id);

    return res.status(200).json({ success: true, message: "Admin Created!" });
  } catch (error) {
    console.error("Admin registration error:", error);
    
    // Handle mongoose validation errors
    if (error.name === 'ValidationError') {
      const validationErrors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ 
        success: false, 
        message: validationErrors.join(', ') 
      });
    }
    
    // Handle duplicate key errors
    if (error.code === 11000) {
      return res.status(400).json({ 
        success: false, 
        message: "Admin with this email already exists" 
      });
    }
    
    return res.status(500).json({ 
      success: false, 
      message: "Internal server error during registration" 
    });
  }
};




