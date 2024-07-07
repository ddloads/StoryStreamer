// server/src/routes/audiobookRoutes.js
import express from 'express';
import { 
  getAudiobooks, 
  getAudiobook, 
  addAudiobook, 
  updateAudiobook, 
  deleteAudiobook, 
  scanLibrary,
  getRecentAudiobooks,
  getRecommendedAudiobooks 
} from '../controllers/audiobookController.js';

const router = express.Router();

router.get('/scan', scanLibrary);
router.get('/recent', getRecentAudiobooks); // Add this line
router.get('/recommended', getRecommendedAudiobooks); // Add this line
router.get('/', getAudiobooks);
router.get('/:id', getAudiobook);
router.post('/', addAudiobook);
router.put('/:id', updateAudiobook);
router.delete('/:id', deleteAudiobook);

export default router;
