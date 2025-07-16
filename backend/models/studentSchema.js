import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  registrationNumber: {
    type: String,
    required: true,
    unique: true
  },
  grade: {
    type: String,
    required: true
  },
});

export default mongoose.model('Student', studentSchema);



