// server/src/models/audiobook.js
import mongoose from 'mongoose';

const audiobookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  narrator: { type: String },
  filepath: { type: [String], required: true },
  coverImage: { type: String },
  description: { type: String },
  dateAdded: { type: Date, default: Date.now }
});

const Audiobook = mongoose.model('Audiobook', audiobookSchema);
export default Audiobook;
