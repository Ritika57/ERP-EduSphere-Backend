import { Book } from "../models/librarySchema.js";
import { handleValidationError } from "../middlewares/errorHandler.js";

export const createBook = async (req, res, next) => {
  console.log(req.body);
  const { bookname, author } = req.body;
  try {
  if (!bookname || !author ) {
    return next("Please Fill Full Form!", 400);
  }
  await Book.create({ bookname, author });
  res.status(200).json({
    success: true,
    message: "A new book is Created!",
  });    
} catch (err) {
  next(err);
} 
};

export const getAllBooks= async (req, res, next) => {
  try {
   const books = await Book.find();
  res.status(200).json({
    success: true,
    books,
  });   
} catch (err) {
  next(err);
}
};

export const pickBook = async (req, res) => {
  const { bookId, studentId } = req.body;

  // Example logic:
  const book = await Book.findById(bookId);
  if (!book) return res.status(404).json({ success: false, message: "Book not found" });

  book.isBorrowed = true;
  book.borrowedBy = studentId;
  await book.save();

  res.status(200).json({ success: true, message: "Book picked" });
};

export const returnBook = async (req, res) => {
  const { bookId, studentId } = req.body;

  const book = await Book.findById(bookId);
  if (!book) return res.status(404).json({ success: false, message: "Book not found" });

  book.isBorrowed = false;
  book.borrowedBy = null;
  await book.save();

  res.status(200).json({ success: true, message: "Book returned" });
};


