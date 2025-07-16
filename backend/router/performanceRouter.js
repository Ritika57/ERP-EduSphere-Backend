import express from 'express';
import { getAllPerformance, createPerformance } from '../controllers/performanceController.js';

const router = express.Router();

// GET all performance records
router.get('/', getAllPerformance);
// POST create a new performance record
router.post('/', createPerformance);

export default router; 