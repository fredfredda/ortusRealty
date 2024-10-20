import express from 'express';
import { isLoggedin } from '../controllers/AuthController.js';

const router = express.Router();
// getting the token on refresh
router.get('/checksession', isLoggedin);

export default router;