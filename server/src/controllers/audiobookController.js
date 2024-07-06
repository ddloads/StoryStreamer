// server/src/controllers/audiobookController.js
import Audiobook from '../models/audiobook.js';

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
