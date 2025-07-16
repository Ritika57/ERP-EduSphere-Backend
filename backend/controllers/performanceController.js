import Performance from '../models/performanceSchema.js';
import Student from '../models/studentSchema.js';

// Get all performance records
export const getAllPerformance = async (req, res) => {
  try {
    const performances = await Performance.find().populate('student', 'name');
    res.status(200).json(performances);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching performance data', error });
  }
};

// Create a new performance record
export const createPerformance = async (req, res) => {
  try {
    const { student, score, subject, date } = req.body;
    const newPerformance = new Performance({ student, score, subject, date });
    await newPerformance.save();
    res.status(201).json(newPerformance);
  } catch (error) {
    res.status(500).json({ message: 'Error creating performance record', error });
  }
}; 