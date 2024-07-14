import fs from 'fs';
import path from 'path';
import { parseFile } from 'music-metadata';
import Audiobook from '../models/audiobook.js';
import logger from '../utils/logger.js';

// Ensure the covers directory exists
const ensureCoversDirectoryExists = async () => {
  const coversDir = path.join(__dirname, '../public/covers');
  try {
    await fs.promises.access(coversDir);
  } catch (error) {
    await fs.promises.mkdir(coversDir, { recursive: true });
    logger.info(`Covers directory created at ${coversDir}`);
  }
};

// Function to save cover image to a specific path
const saveCoverImage = async (cover, title) => {
  await ensureCoversDirectoryExists();
  const coverImagePath = path.join(__dirname, '../public/covers', `${title.replace(/[^a-zA-Z0-9]/g, '_')}.png`);
  try {
    await fs.promises.writeFile(coverImagePath, cover);
    return `/covers/${title.replace(/[^a-zA-Z0-9]/g, '_')}.png`;
  } catch (error) {
    logger.error(`Error saving cover image for ${title}: ${error.message}`);
    throw new Error(`Error saving cover image for ${title}`);
  }
};

// Function to scan a directory and extract metadata for audiobooks
const scanDirectory = async (directory, libraryName) => {
  try {
    const files = await fs.promises.readdir(directory);
    for (const file of files) {
      const filePath = path.join(directory, file);
      const stat = await fs.promises.stat(filePath);

      if (stat.isDirectory()) {
        // Recursively scan subdirectories
        await scanDirectory(filePath, libraryName);
      } else if (stat.isFile() && /\.(mp3|m4b|m4a|aac|ogg|wma|flac|alac|wav)$/i.test(file)) {
        try {
          const metadata = await parseFile(filePath);
          const { title, artist, album, year, genre, comment, picture } = metadata.common;
          const duration = metadata.format.duration;

          const existingAudiobook = await Audiobook.findOne({ filepath: filePath });
          const newAudiobookData = {
            title: title || path.basename(file, path.extname(file)),
            author: artist || 'Unknown',
            series: album || 'Unknown',
            narrator: comment ? comment[0] : 'Unknown',
            publishYear: year || 'Unknown',
            genres: genre || [],
            duration,
            filepath: filePath,
            coverImage: picture ? await saveCoverImage(picture[0].data, title) : null,
            description: 'No description available',
            dateAdded: new Date(),
            library: libraryName
          };

          if (!existingAudiobook) {
            const audiobook = new Audiobook(newAudiobookData);
            await audiobook.save();
            logger.info(`Added new audiobook: ${audiobook.title}`);
          } else {
            Object.assign(existingAudiobook, newAudiobookData);
            await existingAudiobook.save();
            logger.info(`Updated existing audiobook: ${existingAudiobook.title}`);
          }
        } catch (error) {
          logger.error(`Error reading metadata for file ${filePath}: ${error.message}`);
        }
      }
    }
  } catch (error) {
    logger.error(`Error scanning directory ${directory}: ${error.message}`);
  }
};

export default scanDirectory;
