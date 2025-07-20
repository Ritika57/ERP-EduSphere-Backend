import Performance from '../models/performanceSchema.js';
import Student from '../models/studentSchema.js';

// Get all performance records
export const getAllPerformance = async (req, res) => {
  try {
    console.log('Fetching all performance records...');
    const performances = await Performance.find().populate('student', 'name');
    res.status(200).json(performances);
  } catch (error) {
    console.error('Error fetching performance data:', error);
    if (error && error.stack) {
      console.error(error.stack);
    }
    res.status(500).json({ message: 'Error fetching performance data', error: error.message || error });
  }
};

// Create a new performance record
export const createPerformance = async (req, res) => {
  try {
    const { student, score, subject, date, email } = req.body;
    const newPerformance = new Performance({ student, score, subject, date, email });
    await newPerformance.save();
    res.status(201).json(newPerformance);
  } catch (error) {
    res.status(500).json({ message: 'Error creating performance record', error });
  }
}; 