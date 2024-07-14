import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import connectDB from './config/database.js';
import audiobookRoutes from './routes/audiobookRoutes.js';
import userRoutes from './routes/userRoutes.js';
import audioRoutes from './routes/audioRoutes.js';

dotenv.config();

const app = express();

// Middleware
app.use(cors({
  origin: 'http://localhost:3000', // or whatever your frontend URL is
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// Connect to database
connectDB();

// Equivalent of __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files from the 'public' directory
app.use(express.static(path.join(path.resolve(), 'public')));

// Routes
app.use('/api/audiobooks', audiobookRoutes);
app.use('/api/users', userRoutes);
app.use('/api/audio', audioRoutes);

// Test Route
app.get('/', (req, res) => {
  res.send('API is running...');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});