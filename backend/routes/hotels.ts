import { Router } from 'express';
import { getAllHotels, createHotel } from '../controllers/hotelController';

const router = Router();

router.get('/', getAllHotels);
router.post('/', createHotel);

export default router;

