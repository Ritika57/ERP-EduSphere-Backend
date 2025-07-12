import express from "express";
import { adminSignIn } from "../controllers/usersController.js";
import { adminRegister } from "../controllers/adminRegisterController.js";

const router = express.Router();


router.post('/signin', adminSignIn);
router.post('/admin', adminRegister);

router.post('/admin', (req, res, next) => {
  console.log("✅ [DEBUG] /api/v1/register/admin HIT");
  next();
}, adminRegister);


export default router;

