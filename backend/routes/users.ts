import { Router } from 'express';
import { getAllUsers, createUser, updateUserByPhone } from '../controllers/userController';

const router = Router();

router.get('/', getAllUsers);
router.post('/', createUser);
router.put('/:ph_no', updateUserByPhone);

export default router;

