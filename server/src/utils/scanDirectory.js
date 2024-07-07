// server/src/utils/scanDirectory.js
import fs from 'fs/promises';
import path from 'path';
import { parseFile } from 'music-metadata';
import sharp from 'sharp';
import Audiobook from '../models/audiobook.js';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Equivalent of __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const audioExtensions = ['.mp3', '.m4b', '.m4a', '.aac', '.ogg', '.wma', '.flac', '.alac', '.wav'];

function isAudiobookFile(file) {
  return audioExtensions.includes(path.extname(file).toLowerCase());
}

async function saveCoverImage(imageBuffer, title) {
  const sanitizedTitle = title.replace(/[^a-z0-9]/gi, '_').toLowerCase();
  const fileName = `${sanitizedTitle}.png`;
  const filePath = path.join(__dirname, '../../public/covers', fileName);

  await sharp(imageBuffer).toFormat('png').toFile(filePath);
  return `/covers/${fileName}`;
}

async function scanDirectory(dir, onProgress) {
  const files = await fs.readdir(dir);
  const audiobooks = new Map();

  for (const file of files) {
    const filePath = path.join(dir, file);
    const stats = await fs.stat(filePath);

    if (stats.isDirectory()) {
      const subDirectoryAudiobooks = await scanDirectory(filePath, onProgress);
      subDirectoryAudiobooks.forEach((value, key) => audiobooks.set(key, value));
    } else if (stats.isFile() && isAudiobookFile(file)) {
      const bookName = path.basename(path.dirname(filePath));
      let metadata = {};

      try {
        const fileMetadata = await parseFile(filePath);
        let coverImagePath = null;
        if (fileMetadata.common.picture && fileMetadata.common.picture[0]) {
          const picture = fileMetadata.common.picture[0];
          coverImagePath = await saveCoverImage(picture.data, fileMetadata.common.title || bookName);
        }
        metadata = {
          title: fileMetadata.common.title || bookName,
          author: fileMetadata.common.artist || 'Unknown',
          narrator: fileMetadata.common.artist || 'Unknown',
          publishYear: fileMetadata.common.year || 'N/A',
          publisher: fileMetadata.common.label || 'N/A',
          genres: fileMetadata.common.genre || [],
          tags: fileMetadata.common.genre || [],
          language: fileMetadata.common.language || 'N/A',
          duration: fileMetadata.format.duration ? `${Math.floor(fileMetadata.format.duration / 3600)} hr ${Math.floor((fileMetadata.format.duration % 3600) / 60)} min` : 'N/A',
          filepath: [filePath],
          coverImage: coverImagePath,
          description: fileMetadata.common.comment ? fileMetadata.common.comment[0] : '',
          format: path.extname(file).toLowerCase().slice(1),
          fileSize: `${(stats.size / (1024 * 1024)).toFixed(2)} MB`,
          isbn: fileMetadata.common.isbn || 'N/A',
          rating: 0,
          reviews: [],
          chapters: fileMetadata.common.chapters || []
        };
      } catch (err) {
        console.error(`Error reading metadata for file ${filePath}:`, err);
      }

      if (!audiobooks.has(bookName)) {
        audiobooks.set(bookName, metadata);
      } else {
        audiobooks.get(bookName).filepath.push(filePath);
      }
      onProgress(filePath);
    }
  }

  return audiobooks;
}

export default scanDirectory;
