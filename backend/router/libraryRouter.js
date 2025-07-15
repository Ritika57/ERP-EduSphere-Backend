import express from "express";
import { getAllBooks, createBook, pickBook, returnBook } from "../controllers/libraryController.js";

const router = express.Router();

router.get('/getall', getAllBooks);
router.post('/books', createBook);
router.post('/', createBook);
router.post('/pick', pickBook);
router.post('/return', returnBook);



export default router;


