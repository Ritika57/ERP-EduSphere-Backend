import express from "express";
import {
  addExam,
  getAllExams,
  deleteExam,
  updateExam,
} from "../controllers/examController.js";

const router = express.Router();

router.post("/", addExam);
router.get("/getall", getAllExams);
router.delete("/delete/:id", deleteExam);
router.put("/update/:id", updateExam);

export default router;
