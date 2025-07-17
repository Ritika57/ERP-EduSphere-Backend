
import {Admin } from "../models/adminRegisterSchema.js";
import { handleValidationError } from "../middlewares/errorHandler.js";

export const adminRegister = async (req, res, next) => {
  console.log("REQ.BODY:", req.body);

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

    await Admin.create({ email, password });

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
    
    return res.status(500).json({ 
      success: false, 
      message: "Internal server error during registration" 
    });
  }
};




