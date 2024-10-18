import express from 'express';
import { userLogin, userSignUp, userLogout, editProfile, deleteAccount, isLoggedin } from '../controllers/UserController.js';
import protectRoute from '../middlewares/ProtectRoute.js';

const router = express.Router();
// getting the token on refresh
router.get('/isloggedin', isLoggedin);
// auth routes
router.post('/login', userLogin);
router.post('/signup', userSignUp); // account creation
router.post('/logout', protectRoute, userLogout);
// edit profile 
router.put('/editprofile', protectRoute, editProfile);
// delete account
router.delete('/deleteaccount', protectRoute, deleteAccount);

export default router;