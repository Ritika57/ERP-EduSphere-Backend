
import {Admin } from "../models/adminRegisterSchema.js";
import { handleValidationError } from "../middlewares/errorHandler.js";

export const adminRegister = async (req, res, next) => {
  console.log("REQ.BODY:", req.body);

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ success: false, message: "Please Fill Form!" });
  }

  const existingAdmin = await Admin.findOne({ email });
  if (existingAdmin) {
    return res.status(400).json({ success: false, message: "Admin already exists" });
  }

  await Admin.create({ email, password });

  return res.status(200).json({ success: true, message: "Admin Created!" });
};




