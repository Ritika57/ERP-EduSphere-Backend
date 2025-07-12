import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs"; // ✅ Add bcrypt

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
});

// ✅ Hash password before saving
adminRegisterSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// ✅ Add method to compare password
adminRegisterSchema.methods.isValidPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

export const Admin = mongoose.model('Admin', adminRegisterSchema);
