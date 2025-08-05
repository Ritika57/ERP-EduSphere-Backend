import { Book } from "../models/librarySchema.js";
import { handleValidationError } from "../middlewares/errorHandler.js";

export const createBook = async (req, res, next) => {
  console.log(req.body);
  const { bookname, author } = req.body;
  try {
    if (!bookname || !author) {
      return next("Please Fill Full Form!", 400);
    }
    const book = await Book.create({ bookname, author });
    res.status(200).json({
      success: true,
      message: "A new book is Created!",
      book,
    });
  } catch (err) {
    next(err);
  }
};

export const getAllBooks = async (req, res, next) => {
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
  try {
    const { bookId, studentId } = req.body;

    if (!bookId || !studentId) {
      return res.status(400).json({
        success: false,
        message: "Book ID and Student ID are required",
      });
    }

    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({
        success: false,
        message: "Book not found",
      });
    }

    if (book.isBorrowed) {
      return res.status(400).json({
        success: false,
        message: "Book is already borrowed",
      });
    }

    book.isBorrowed = true;
    book.borrowedBy = studentId;
    book.borrowedAt = new Date();
    await book.save();

    res.status(200).json({
      success: true,
      message: "Book borrowed successfully",
    });
  } catch (error) {
    console.error("Error borrowing book:", error);
    res.status(500).json({
      success: false,
      message: "Error borrowing book",
    });
  }
};

export const returnBook = async (req, res) => {
  try {
    const { bookId, studentId } = req.body;

    if (!bookId || !studentId) {
      return res.status(400).json({
        success: false,
        message: "Book ID and Student ID are required",
      });
    }

    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({
        success: false,
        message: "Book not found",
      });
    }

    if (!book.isBorrowed) {
      return res.status(400).json({
        success: false,
        message: "Book is not currently borrowed",
      });
    }

    if (book.borrowedBy.toString() !== studentId) {
      return res.status(403).json({
        success: false,
        message: "You can only return books that you borrowed",
      });
    }

    book.isBorrowed = false;
    book.borrowedBy = null;
    book.borrowedAt = null;
    await book.save();

    res.status(200).json({
      success: true,
      message: "Book returned successfully",
    });
  } catch (error) {
    console.error("Error returning book:", error);
    res.status(500).json({
      success: false,
      message: "Error returning book",
    });
  }
};
