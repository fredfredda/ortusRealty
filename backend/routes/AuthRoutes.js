import express from 'express';
import { isLoggedin, sendEmail, resetPassword } from '../controllers/AuthController.js';

const router = express.Router();
// getting the token on refresh
router.get('/isloggedin', isLoggedin);
router.post('/sendemail', sendEmail);
router.post('/reset-password/:tokenId', resetPassword);

export default router;