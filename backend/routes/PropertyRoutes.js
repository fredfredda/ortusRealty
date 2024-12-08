import express from 'express';
import {
    saveProperty,
    unsaveProperty,
    getSavedProperties,
    getAllProperties,
    getProperty,
    getImportantInfrestrucutre,
    getFeaturedProperties,
    getNearbyProperties,
    getSavedPropertiesDetails,
} from '../controllers/PropertyController.js';
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
// get saved properties
router.get('/savedproperties', protectRoute, getSavedProperties);
// get details about saved properties
router.get('/savedpropertiesdetails', protectRoute, getSavedPropertiesDetails);
// save property
router.post('/saveproperty/:propertyId', protectRoute, saveProperty);
// unsave property
router.delete('/unsaveproperty/:propertyId', protectRoute, unsaveProperty);

export default router;