// server/src/models/audiobook.js
import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  rating: { type: Number, required: true },
  comment: { type: String, required: true },
  date: { type: Date, default: Date.now }
});

const audiobookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  series: { type: String },
  author: { type: String, required: true },
  narrator: { type: String },
  publishYear: { type: Number },
  publisher: { type: String },
  genres: { type: [String] },
  tags: { type: [String] },
  language: { type: String },
  duration: { type: String },
  filepath: [{ type: String, required: true }],
  coverImage: { type: String },
  description: { type: String },
  dateAdded: { type: Date, default: Date.now },
  isbn: { type: String },
  rating: { type: Number, default: 0 },
  reviews: { type: [reviewSchema] },
  chapters: { type: [String] },
  format: { type: String },
  fileSize: { type: String }
});

export default mongoose.model('Audiobook', audiobookSchema);
