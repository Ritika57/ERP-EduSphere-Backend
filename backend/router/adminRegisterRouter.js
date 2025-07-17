import express from "express";
import { adminSignIn, getAdminFromToken, getAdminProfile, updateAdminProfile } from "../controllers/usersController.js";
import { adminRegister } from "../controllers/adminRegisterController.js";

const router = express.Router();

router.post('/signin', adminSignIn);

router.post('/admin', (req, res, next) => {
  console.log("✅ [DEBUG] /api/v1/register/admin HIT");
  next();
}, adminRegister);

// Admin profile routes
router.get('/admin/profile', getAdminFromToken, getAdminProfile);
router.put('/admin/profile', getAdminFromToken, updateAdminProfile);

export default router;

