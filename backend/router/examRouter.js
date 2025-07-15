import express from "express";
import { addExam, getAllExams } from "../controllers/examController.js";

const router = express.Router();

router.post('/', addExam);
router.get('/getall', getAllExams);

export default router;