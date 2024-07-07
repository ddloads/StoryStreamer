// server/src/controllers/audiobookController.js
import Audiobook from '../models/audiobook.js';
import scanDirectory from '../utils/scanDirectory.js';
import path from 'path';

export const getAudiobooks = async (req, res) => {
  try {
    const audiobooks = await Audiobook.find();
    res.json(audiobooks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getAudiobook = async (req, res) => {
  try {
    const audiobook = await Audiobook.findById(req.params.id);
    if (!audiobook) return res.status(404).json({ message: 'Audiobook not found' });
    res.json(audiobook);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const addAudiobook = async (req, res) => {
  const { title, author, narrator, filepath, coverImage, description } = req.body;

  try {
    const newAudiobook = new Audiobook({ title, author, narrator, filepath, coverImage, description });
    await newAudiobook.save();
    res.status(201).json(newAudiobook);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateAudiobook = async (req, res) => {
  try {
    const audiobook = await Audiobook.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!audiobook) return res.status(404).json({ message: 'Audiobook not found' });
    res.json(audiobook);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteAudiobook = async (req, res) => {
  try {
    const audiobook = await Audiobook.findByIdAndDelete(req.params.id);
    if (!audiobook) return res.status(404).json({ message: 'Audiobook not found' });
    res.json({ message: 'Audiobook deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const scanLibrary = async (req, res) => {
  const libraryPath = process.env.LIBRARY_PATH;
  if (!libraryPath) {
    return res.status(400).json({ error: 'LIBRARY_PATH not set in environment variables' });
  }

  const fullLibraryPath = path.resolve(libraryPath);

  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  try {
    const scannedAudiobooks = await scanDirectory(fullLibraryPath, (filePath) => {
      res.write(`data: ${JSON.stringify({ message: 'Scanning...', file: filePath })}\n\n`);
    });

    const newAudiobooks = [];

    for (const [bookName, audiobook] of scannedAudiobooks) {
      const existingAudiobook = await Audiobook.findOne({ title: bookName });

      if (!existingAudiobook) {
        const newAudiobook = new Audiobook({
          title: audiobook.title,
          series: audiobook.series,
          author: audiobook.author,
          narrator: audiobook.narrator,
          publishYear: audiobook.publishYear,
          publisher: audiobook.publisher,
          genres: audiobook.genres,
          tags: audiobook.tags,
          language: audiobook.language,
          duration: audiobook.duration,
          filepath: audiobook.filepath.join(';'),
          coverImage: audiobook.coverImage,
          description: audiobook.description,
          dateAdded: audiobook.dateAdded,
          isbn: audiobook.isbn,
          rating: audiobook.rating,
          reviews: audiobook.reviews,
          chapters: audiobook.chapters,
          format: audiobook.format,
          fileSize: audiobook.fileSize
        });
        await newAudiobook.save();
        newAudiobooks.push(newAudiobook);
      } else {
        const newFilePaths = audiobook.filepath.filter(fp => !existingAudiobook.filepath.includes(fp));
        if (newFilePaths.length > 0) {
          existingAudiobook.filepath += ';' + newFilePaths.join(';');
          await existingAudiobook.save();
        }
      }
    }

    res.write(`data: ${JSON.stringify({ message: 'Library scanned successfully', totalScanned: scannedAudiobooks.size, newAudiobooksAdded: newAudiobooks.length })}\n\n`);
    res.end();
  } catch (err) {
    console.error('Error scanning library:', err);
    if (!res.headersSent) {
      res.status(500).json({ error: err.message });
    }
  }
};

// Function to get recent audiobooks
export const getRecentAudiobooks = async (req, res) => {
  try {
    const recentAudiobooks = await Audiobook.find().sort({ dateAdded: -1 }).limit(10);
    res.json(recentAudiobooks);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching recent audiobooks' });
  }
};

// Function to get recommended audiobooks (This could be based on any logic you prefer)
export const getRecommendedAudiobooks = async (req, res) => {
  try {
    // This is a placeholder logic, replace with your recommendation logic
    const recommendedAudiobooks = await Audiobook.find().limit(10);
    res.json(recommendedAudiobooks);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching recommended audiobooks' });
  }
};
