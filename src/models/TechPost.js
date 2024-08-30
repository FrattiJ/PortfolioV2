import mongoose from 'mongoose';

const TechPostSchema = new mongoose.Schema({
  title: String,
  content: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.TechPost || mongoose.model('TechPost', TechPostSchema);
