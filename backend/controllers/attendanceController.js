import Attendance from "../models/attendanceSchema.js";
import { handleValidationError } from "../middlewares/errorHandler.js";

export const markAttendance = async (req, res, next) => {
  const { attendanceData } = req.body;
  try {
    console.log('Received attendanceData:', attendanceData);
    if (!attendanceData || !Array.isArray(attendanceData) || attendanceData.length === 0) {
      return next(handleValidationError("Attendance data is missing or invalid!", 400));
    }
    
    const attendanceRecords = await Promise.all(attendanceData.map(async (record) => {
      const { student, status, date, email } = record;
      
      // Convert date to start of day for comparison
      const recordDate = new Date(date);
      recordDate.setHours(0, 0, 0, 0);
      
      // Check if attendance record already exists for this student and date
      const existingRecord = await Attendance.findOne({
        student: student,
        date: {
          $gte: recordDate,
          $lt: new Date(recordDate.getTime() + 24 * 60 * 60 * 1000) // Next day
        }
      });
      
      if (existingRecord) {
        // Update existing record
        existingRecord.status = status;
        existingRecord.email = email;
        await existingRecord.save();
        return existingRecord;
      } else {
        // Create new record
        return await Attendance.create({ student, status, date: recordDate, email });
      }
    }));
    
    res.status(200).json({
      success: true,
      message: "Attendance marked successfully!",
      attendanceRecords
    });
  } catch (err) {
    console.error('Error in markAttendance:', err);
    next(err);
  }
};

export const getAllAttendance = async (req, res, next) => {
  try {
    const attendanceRecords = await Attendance.find().populate('student', 'name registrationNumber grade');
    res.status(200).json({
      success: true,
      attendanceRecords
    });
  } catch (err) {
    next(err);
  }
};

export const getAttendanceByDate = async (req, res, next) => {
  try {
    const { date } = req.params;
    console.log('Fetching attendance for date:', date);
    
    // Convert date string to start and end of day
    const startDate = new Date(date);
    startDate.setHours(0, 0, 0, 0);
    
    const endDate = new Date(date);
    endDate.setHours(23, 59, 59, 999);
    
    console.log('Date range:', { startDate, endDate });
    
    const attendanceRecords = await Attendance.find({
      date: {
        $gte: startDate,
        $lte: endDate
      }
    }).populate('student', 'name registrationNumber grade');
    
    console.log('Found attendance records:', attendanceRecords.length);
    console.log('Records:', attendanceRecords);
    
    res.status(200).json({
      success: true,
      attendanceRecords
    });
  } catch (err) {
    console.error('Error in getAttendanceByDate:', err);
    next(err);
  }
};
