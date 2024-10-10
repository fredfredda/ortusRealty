import { createSavedSearch, updateSavedSearch, getSavedSearch, removeSavedSearch, getSavedSearchesFromDb } from "../models/SavedSearchModel";

const getSavedSearches = async (req,res) => {
    const {userId} = req.user;
    try {
        const data = await getSavedSearchesFromDb(userId);
        return res.status(200).json({data});
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
}

const saveSearch = async (req,res) => {
    const {userId} = req.userId;
    const { propertyType, category, homeCategory, province, search, priceRange, sizeRange } = req.query;
    try {
        let filters = `${propertyType},${category},${homeCategory},${province},${search},${priceRange},${sizeRange}`;
        let saveSearch_ = await createSavedSearch(userId, filters);
        if(saveSearch_.error) return res.status(500).json(saveSearch_);

        return res.status(200).json({success: "Search saved"});
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
}

const editSavedSearch = async (req,res) => {
    const {userId} = req.user;
    const {savedSearchId} = req.params;
    const { propertyType, category, homeCategory, province, search, priceRange, sizeRange } = req.query;
    try {
        let savedSearch = await getSavedSearch(userId, savedSearchId);
        if (savedSearch.length === 0) return res.status(400).json({error: "Saved search not found"});

        let filters = `${propertyType},${category},${homeCategory},${province},${search},${priceRange},${sizeRange}`;
        let editSearch = await updateSavedSearch(userId, savedSearchId, filters);
        if(editSearch.error) return res.status(500).json(editSearch);

        return res.status(200).json({success: "Saved search edited"});
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
}

const deleteSavedSearch = async (req,res) => {
    const {userId} = req.user;
    const {savedSearchId} = req.params;
    try {
        let savedSearch = await getSavedSearch(userId, savedSearchId);
        if (savedSearch.length === 0) return res.status(400).json({error: "Saved search not found"});

        let deleteSearch = await removeSavedSearch(userId, savedSearchId);
        if(deleteSearch.error) return res.status(500).json(deleteSearch);

        return res.status(200).json({success: "Saved search deleted"});
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
}

export { saveSearch, editSavedSearch, deleteSavedSearch, getSavedSearches }