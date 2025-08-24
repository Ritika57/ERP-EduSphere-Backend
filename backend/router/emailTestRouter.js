import express from "express";
import { testEmailConfig, testWelcomeEmail, testStudentWelcomeEmail, testTeacherWelcomeEmail } from "../controllers/emailTestController.js";

const router = express.Router();

// Test email configuration
router.get("/test-config", testEmailConfig);

// Test admin welcome email sending
router.post("/test-welcome", testWelcomeEmail);

// Test student welcome email sending
router.post("/test-student-welcome", testStudentWelcomeEmail);

// Test teacher welcome email sending
router.post("/test-teacher-welcome", testTeacherWelcomeEmail);

export default router;
