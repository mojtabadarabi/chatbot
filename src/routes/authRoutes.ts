import express from 'express';
import { login, logout, register, user } from '../controllers/authControllers';
import authenticateToken from '../middlewares/auth.middleware';
import validate from '../middlewares/validate';
import userValidation from '../validator/userValidator';

const router = express.Router();

router.post('/register', validate(userValidation.register), register);
router.post('/login', validate(userValidation.login), login);
router.get('/user', [authenticateToken, validate(userValidation.user)], user);
router.delete('/user', [authenticateToken, validate(userValidation.user)], logout);

export default router;