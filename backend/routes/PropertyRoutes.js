import express from 'express';
import { inquireProperty, cancelPropertyInquiry, saveProperty, unsaveProperty, getPropertyInquiries, getSavedProperties, getAllProperties, getProperty, getImportantInfrestrucutre, getFeaturedProperties, getNearbyProperties } from '../controllers/PropertyController.js';
import protectRoute from '../middlewares/ProtectRoute.js';

const router = express.Router();

// get properties
router.get('/', getAllProperties);
// get property
router.get('/getproperty/:propertyId', getProperty);
// get featured propperties
router.get('/featuredproperties', getFeaturedProperties);
// get nearby properties
router.get('/nearbyproperties/:neighborhoodId/:propertyId', getNearbyProperties);
// get important infrastructures
router.get('/importantinfrastructure/:neighborhoodId', getImportantInfrestrucutre);
// inquire property
router.post('/inquireproperty/:propertyId', protectRoute, inquireProperty);
// cancel property inquiry
router.put('/cancelpropertyinquiry/:propertyId', protectRoute, cancelPropertyInquiry);
// save property
router.post('/saveproperty/:propertyId', protectRoute, saveProperty);
// unsave property
router.delete('/unsaveproperty/:propertyId', protectRoute, unsaveProperty);
// get property inquiries
router.get('/propertyinqruiries', protectRoute, getPropertyInquiries);
// get saved properties
router.get('/savedproperties', protectRoute, getSavedProperties);

export default router;