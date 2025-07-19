import express from "express";
import { createAssignment, getAllAssignments, submitAssignment, getStudentSubmissions } from "../controllers/assignmentController.js";

const router = express.Router();

router.post("/", createAssignment);
router.get("/getall", getAllAssignments);
router.post("/submit", submitAssignment);
router.get("/submissions/:studentId", getStudentSubmissions);

export default router;
