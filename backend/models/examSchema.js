import mongoose from "mongoose";

const examSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  registrationNumber: {
    type: String,
    required: true
  },
  className: {
    type: String,
    required: true
  },
  marks: {
    type: Number,
    required: true
  },
  email: {                // <-- Add this block
    type: String,
    required: false
  }
});

export const Exam = mongoose.model('Exam', examSchema);

