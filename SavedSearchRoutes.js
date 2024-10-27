import express from 'express';
import { saveSearch, editSavedSearch, deleteSavedSearch, getSavedSearches } from '../controllers/SavedSearchController.js';
import protectRoute from '../middlewares/ProtectRoute.js';

const router = express.Router();

// save a search
router.post('/savesearch', protectRoute, saveSearch)
// edit a saved search
router.put('/editsavedsearch/:savedSearchId', protectRoute, editSavedSearch);
// delete a saved search
router.delete('/deletesavedsearch/:savedSearchId', protectRoute, deleteSavedSearch);
// get saved searches
router.get('/', protectRoute, getSavedSearches);

export default router;