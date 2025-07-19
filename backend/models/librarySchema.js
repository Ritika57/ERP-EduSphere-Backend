import mongoose from "mongoose";
import validator from "validator";

const librarySchema = new mongoose.Schema({
  bookname: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
    unique: true,
  },
  isBorrowed: {
    type: Boolean,
    default: false,
  },
  borrowedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
    default: null,
  },
  borrowedAt: {
    type: Date,
    default: null,
  },
});

export const Book = mongoose.model("Library", librarySchema);
