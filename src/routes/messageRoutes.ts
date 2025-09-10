import express from 'express';
import { sendMessage } from '../controllers/messageControllers';
import authenticateToken from '../middlewares/auth.middleware';
import validate from '../middlewares/validate';
import messageValidation from '../validator/messageValidator';

const router = express.Router();

router.post('/send', [authenticateToken, validate(messageValidation.sendMessage)], sendMessage);

export default router;