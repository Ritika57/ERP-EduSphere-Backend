import express from "express";
import { getAllClasses, createClass, getClassCount, deleteClass } from "../controllers/classConroller.js";

const router = express.Router();

router.get('/getall', getAllClasses);
router.post('/', createClass);
router.get('/count', getClassCount);
router.delete('/delete/:id', deleteClass);


export default router;


