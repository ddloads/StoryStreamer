import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

router.get('/', (req, res) => {
  const filePath = req.query.filepath;

  if (!filePath) {
    return res.status(400).send('Filepath is required');
  }

  console.log('Attempting to serve file:', filePath);

  // Check if file exists
  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      console.error('File access error:', err);
      return res.status(404).send(`File not found: ${err.message}`);
    }

    // File exists, try to stream it
    const stat = fs.statSync(filePath);
    const fileSize = stat.size;
    const range = req.headers.range;

    try {
      if (range) {
        const parts = range.replace(/bytes=/, "").split("-");
        const start = parseInt(parts[0], 10);
        const end = parts[1] ? parseInt(parts[1], 10) : fileSize-1;
        const chunksize = (end-start)+1;
        const file = fs.createReadStream(filePath, {start, end});
        const head = {
          'Content-Range': `bytes ${start}-${end}/${fileSize}`,
          'Accept-Ranges': 'bytes',
          'Content-Length': chunksize,
          'Content-Type': 'audio/x-m4a',
        };
        res.writeHead(206, head);
        file.pipe(res);
      } else {
        const head = {
          'Content-Length': fileSize,
          'Content-Type': 'audio/x-m4a',
        };
        res.writeHead(200, head);
        fs.createReadStream(filePath).pipe(res);
      }

      console.log('Streaming started for:', filePath);
    } catch (streamErr) {
      console.error('Streaming error:', streamErr);
      res.status(500).send(`Error streaming file: ${streamErr.message}`);
    }
  });
});

export default router;
