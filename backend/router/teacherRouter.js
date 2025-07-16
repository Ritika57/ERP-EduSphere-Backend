import express from "express";
import { createTeacher, getAllTeachers, teacherSignIn, getTeacherCount, getTeacherFromToken, getTeacherProfile, updateTeacherProfile } from "../controllers/teacherController.js";

const router = express.Router();

router.post('/', createTeacher);
router.get('/getall', getAllTeachers);
router.get('/count', getTeacherCount);

// 👇 NEW
router.post('/signin', teacherSignIn);
router.get('/profile', getTeacherFromToken, getTeacherProfile);
router.put('/profile', getTeacherFromToken, updateTeacherProfile);

export default router;
