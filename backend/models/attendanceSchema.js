import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student', // Ensure this matches the actual student model name
    required: true
  },
  status: {
    type: String,
    enum: ['Present', 'Absent', 'Absent with apology'],
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  email: {
    type: String,
    required: true
  }
});

export default mongoose.model('Attendance', attendanceSchema);
