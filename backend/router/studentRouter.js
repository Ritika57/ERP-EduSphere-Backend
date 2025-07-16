import express from "express";
import { getAllStudents, createStudent, getStudentCount } from "../controllers/studentController.js";

const router = express.Router();

router.get('/getall', getAllStudents);
router.get('/', getAllStudents); // Added for dropdown
router.post('/', createStudent);
router.get('/count', getStudentCount);

export default router;


