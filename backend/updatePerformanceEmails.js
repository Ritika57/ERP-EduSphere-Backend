import mongoose from 'mongoose';
import Performance from './models/performanceSchema.js';
import Student from './models/studentSchema.js';

// Connect to your MongoDB
const MONGO_URI = 'mongodb://localhost:27017/school_management';
await mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

async function updatePerformanceEmails() {
  try {
    console.log('Starting to update performance records with email...');
    
    // Find all performance records that don't have an email field or have empty email
    const performances = await Performance.find({ 
      $or: [
        { email: { $exists: false } }, 
        { email: '' }, 
        { email: null }
      ] 
    });
    
    console.log(`Found ${performances.length} performance records to update`);
    
    let updatedCount = 0;
    let skippedCount = 0;

    for (const perf of performances) {
      try {
        // Find the student by their ID
        const student = await Student.findById(perf.student);
        
        if (student && student.email) {
          // Update the performance record with the student's email
          perf.email = student.email;
          await perf.save();
          updatedCount++;
          console.log(`✅ Updated performance ${perf._id} with email: ${student.email}`);
        } else {
          skippedCount++;
          console.log(`❌ Skipped performance ${perf._id} - student not found or no email`);
        }
      } catch (error) {
        console.log(`❌ Error updating performance ${perf._id}:`, error.message);
      }
    }

    console.log(`\n🎉 Update complete!`);
    console.log(`✅ Updated: ${updatedCount} records`);
    console.log(`❌ Skipped: ${skippedCount} records`);
    
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Database connection closed');
  }
}

updatePerformanceEmails(); 