import Attendance from "../models/attendanceSchema.js";
import { handleValidationError } from "../middlewares/errorHandler.js";

export const markAttendance = async (req, res, next) => {
  const { attendanceData } = req.body;
  try {
    console.log('Received attendanceData:', attendanceData); // <-- log incoming data
    if (!attendanceData || !Array.isArray(attendanceData) || attendanceData.length === 0) {
      return next(handleValidationError("Attendance data is missing or invalid!", 400));
    }
    const attendanceRecords = await Promise.all(attendanceData.map(async (record) => {
      const { student, status, date, email } = record;
      // Now also save the email
      return await Attendance.create({ student, status, date, email });
    }));
    res.status(200).json({
      success: true,
      message: "Attendance marked successfully!",
      attendanceRecords
    });
  } catch (err) {
    console.error('Error in markAttendance:', err); // <-- log error
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
