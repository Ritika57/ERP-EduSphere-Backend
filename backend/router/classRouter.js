import express from "express";
import { getAllClasses, createClass, getClassCount } from "../controllers/classConroller.js";

const router = express.Router();

router.get('/getall', getAllClasses);
router.post('/', createClass);
router.get('/count', getClassCount);


export default router;


