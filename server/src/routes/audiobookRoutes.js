// server/src/routes/audiobookRoutes.js
import express from 'express';
import { getAudiobooks, getAudiobook, addAudiobook, updateAudiobook, deleteAudiobook } from '../controllers/audiobookController.js';

const router = express.Router();

router.get('/', getAudiobooks);
router.get('/:id', getAudiobook);
router.post('/', addAudiobook);
router.put('/:id', updateAudiobook);
router.delete('/:id', deleteAudiobook);

export default router;
