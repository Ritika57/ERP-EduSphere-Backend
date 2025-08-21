import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";

const adminRegisterSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Please provide a valid email"],
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  name: { type: String },
  phone: { type: String },
  address: { type: String },
  qualification: { type: String },
});

// ✅ Hash password before saving
adminRegisterSchema.pre("save", async function (next) {
  try {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
  } catch (error) {
    console.error("❌ Error hashing password:", error);
    next(error);
  }
});

// ✅ Add method to compare password
adminRegisterSchema.methods.isValidPassword = async function (password) {
  try {
    return await bcrypt.compare(password, this.password);
  } catch (error) {
    console.error("❌ Error comparing password:", error);
    return false;
  }
};

export const Admin = mongoose.model('Admin', adminRegisterSchema);
