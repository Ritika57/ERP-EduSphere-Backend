import mongoose from 'mongoose';

const performanceSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: true
  },
  score: {
    type: Number,
    required: true
  },
  subject: {
    type: String,
    required: false
  },
  date: {
    type: Date,
    default: Date.now
  },
  email: {
    type: String,
    required: false
  }
});

export default mongoose.model('Performance', performanceSchema); 