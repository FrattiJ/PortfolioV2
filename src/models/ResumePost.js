import mongoose from 'mongoose';

const ResumePostSchema = new mongoose.Schema({
  company: String, // Company or School name
  role: String, // Role or Degree
  duration: String, // Self Explaniatory
  details: [String], // Also self explanatory
});

export default mongoose.models.ResumePost || mongoose.model('ResumePost', ResumePostSchema);
