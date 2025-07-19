import express from "express";
import { markAttendance, getAllAttendance, getAttendanceByDate } from "../controllers/attendanceController.js";

const router = express.Router();

router.post('/', markAttendance);
router.get('/getall', getAllAttendance);
router.get('/date/:date', getAttendanceByDate);

export default router;
