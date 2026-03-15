import { Router } from 'express';
import { getAllRooms, createRoom } from '../controllers/roomController';

const router = Router();

router.get('/', getAllRooms);
router.post('/', createRoom);

export default router;

