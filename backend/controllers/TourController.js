import { getTourRequest, createTourRequest, updateTourRequest, updateTourRequestStatus, getTourRequestsFromDb } from "../models/TourModel.js";

const getTourRequests = async(req,res) => {
    const {userId} = req.user;
    try {
        const data = await getTourRequestsFromDb(userId);
        return res.status(200).json({data});
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
}

const requestTour = async (req,res) => {
    const {userId} = req.user;
    const {propertyId} = req.params;
    const {time, date} = req.body;
    try {
        let tourRequest = await getTourRequest(userId, propertyId);
        if (tourRequest.length > 0) return res.status(400).json({error: "You have already requested a tour for this property"});

        if ( time === undefined || date === undefined ) return res.status(400).json({error: "Missing required fields"});

        let defaultStatus = 1;
        let requestTour_ = await createTourRequest(userId, propertyId, defaultStatus, time, date);
        if (requestTour_.error) return res.status(500).json(requestTour_);

        return res.status(200).json({success: "Tour request created"});
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
}

const modifyTourRequest = async (req,res) => {
    const {userId} = req.user;
    const {propertyId} = req.params;
    const {time, date} = req.body;
    try {
        let tourRequest = await getTourRequest(userId, propertyId);
        if (tourRequest.length === 0) return res.status(400).json({error: "Tour request not found"});

        if ( time === undefined || date === undefined ) return res.status(400).json({error: "Missing required fields"});

        let modifyRequest = await updateTourRequest(userId, propertyId, time, date);
        if (modifyRequest.error) return res.status(500).json(modifyRequest);

        return res.status(200).json({success: "Tour request updated"});
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
}

const cancelTourRequest = async (req,res) => {
    const {userId} = req.user;
    const {propertyId} = req.params;
    try {
        let tourRequest = await getTourRequest(userId, propertyId);
        if (tourRequest.length === 0) return res.status(400).json({error: "Tour request not found"});

        let status = 2;
        let cancelTour = await updateTourRequestStatus(userId, propertyId, status);
        if (cancelTour.error) return res.status(500).json(cancelTour);

        return res.status(200).json({success: "Tour request canceled"})
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
}

export { requestTour, modifyTourRequest, cancelTourRequest, getTourRequests }