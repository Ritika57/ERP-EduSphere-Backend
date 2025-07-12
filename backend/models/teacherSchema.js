import mongoose from "mongoose";
import bcrypt from "bcryptjs"; // ✅ add bcrypt

const teacherSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  subject: { type: String, required: true },
  password: { type: String, required: true } // ✅ required!
});

// ✅ hash password before save
teacherSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// ✅ add method to compare password
teacherSchema.methods.isValidPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

export const Teacher = mongoose.model('Teacher', teacherSchema);
