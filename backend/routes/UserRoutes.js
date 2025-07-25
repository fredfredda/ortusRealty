import express from 'express';
import {
    userLogin,
    userSignUp,
    userLogout,
    editProfile,
    deleteAccount,
    googleOAuthHandler,
    getProfile,
    editPassword,
    getAgents,
    getAgent,
} from '../controllers/UserController.js';
import protectRoute from '../middlewares/ProtectRoute.js';

const router = express.Router();

// get user profile
router.get('/profile', protectRoute, getProfile);
// google oauth
router.get('/oauth/google', googleOAuthHandler);
// auth routes
router.post('/login', userLogin);
router.post('/signup', userSignUp); // account creation
router.post('/logout', protectRoute, userLogout);
// edit profile 
router.put('/editprofile', protectRoute, editProfile);
// edit password
router.put('/editpassword', protectRoute, editPassword);
// delete account
router.delete('/deleteaccount', protectRoute, deleteAccount);
// get all agents
router.get('/agents', getAgents);
// get one agent
router.get('/agent/:agentId', getAgent);

export default router;