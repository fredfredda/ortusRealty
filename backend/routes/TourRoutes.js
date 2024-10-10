import express from 'express';
import { requestTour, modifyTourRequest, cancelTourRequest, getTourRequests } from '../controllers/TourController.js';
import protectRoute from '../middlewares/ProtectRoute.js';

const router = express.Router();

// request a tour
router.post('/requesttour/:propertyId', protectRoute, requestTour);
// modify a tour request
router.put('/modifytourrequest/:propertyId', protectRoute, modifyTourRequest);
// cancel a tour
router.put('/canceltourrequest/:propertyId', protectRoute, cancelTourRequest);
// get tours
router.get('/', protectRoute, getTourRequests)

export default router;