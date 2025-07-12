import express from "express";
import { createTeacher, getAllTeachers, teacherSignIn } from "../controllers/teacherController.js";

const router = express.Router();

router.post('/', createTeacher);
router.get('/getall', getAllTeachers);

// 👇 NEW
router.post('/signin', teacherSignIn);

export default router;
