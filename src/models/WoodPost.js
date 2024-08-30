import mongoose from 'mongoose';

const WoodPostSchema = new mongoose.Schema({
  title: String,
  content: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.WoodPost || mongoose.model('WoodPost', WoodPostSchema);
