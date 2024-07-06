// server/src/models/user.js
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: 'user' },
  completedTitles: { type: Number, default: 0 },
  totalTimeListened: { type: Number, default: 0 }, // Total time in minutes
  favoriteGenres: { type: [String], default: [] },
  listeningHistory: [{
    audiobookId: { type: mongoose.Schema.Types.ObjectId, ref: 'Audiobook' },
    lastListenedAt: { type: Date }
  }],
  recentlyListenedGenres: { type: [String], default: [] },
  likedAudiobooks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Audiobook' }],
  dislikedAudiobooks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Audiobook' }],
  averageListeningDuration: { type: Number, default: 0 }, // Average duration in minutes
  preferredNarrators: { type: [String], default: [] }
});

const User = mongoose.model('User', userSchema);
export default User;
