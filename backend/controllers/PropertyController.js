import { getPropertyInquiry, createPropertyInquiry, updatePropertyInquiryStatus, getSavedProperty, createSavedProperty, deleteSavedProperty, getPropertyInquiriesFromDb, getSavedPropertiesFromdb, getAllPropertiesFromDb, getPropertyFromDb, getImportantInfrestrucutreFromDb, getFeaturedPropertiesFromDb, getNearbyPropertiesFromDb } from "../models/PropertyModel.js";

var allProperties = [];

const getAllProperties = async (req,res) => {
    const { propertyType, saleType, province, priceRange, sizeRange, search } = req.query;
    // const { propertyType, saleType, category, homeCategory, province, search, priceRange, sizeRange } = req.query;
    try {
        if (allProperties.length === 0) {
            allProperties = await getAllPropertiesFromDb();
        }
        // filter by search input
        let properties = allProperties.filter((property) => property['prpty_name'].toLowerCase().includes(search.toLowerCase() || ''));
        // filter by property type
        properties = properties.filter((property) => property['property_type'].includes(propertyType || ''));
        // filter by sale type
        properties = properties.filter((property) => property['saletype_name'].includes(saleType || ''));
        // filter by province
        properties = properties.filter((property) => property['prvc_name'].includes(province || ''));
        // price and size formatting
        let priceRange_ = priceRange === undefined ? '0-1000000000' : priceRange;
        let sizeRange_ = sizeRange === undefined ? '0-10000' : sizeRange;
        let minPrice = priceRange_.split('-')[0];
        let maxPrice =  priceRange_.split('-')[1];
        let minSize = sizeRange_.split('-')[0];
        let maxSize = sizeRange_.split('-')[1];
        // filter by price
        properties = properties.filter((property) => property['prpty_price'] >= Number(minPrice) && property['prpty_price'] <= Number(maxPrice));
        // filter by size
        properties = properties.filter((property) => property['prpty_size'] >= Number(minSize) && property['prpty_size'] <= Number(maxSize));

        return res.status(200).json({properties});
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
}

const getFeaturedProperties = async (req,res) => {
    try {
        let properties = await getFeaturedPropertiesFromDb();
        return res.status(200).json({properties});
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
}

const getNearbyProperties = async (req,res) => {
    const {neighborhoodId, propertyId} = req.params
    try {
        let properties = await getNearbyPropertiesFromDb(neighborhoodId, propertyId);
        return res.status(200).json({properties});
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
}

const getProperty = async (req,res) => {
    const {propertyId} = req.params;
    try {
        let property = await getPropertyFromDb(propertyId);
        if (property.length === 0) return res.status(400).json({error: "Property Not Found"});
        if (property.error) return res.status(500).json(property);
        return res.status(200).json(property[0]);
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
}

const getImportantInfrestrucutre = async (req,res) => {
    const {neighborhoodId} = req.params;
    try {
        let importantInfrastructure = await getImportantInfrestrucutreFromDb(neighborhoodId);
        if (importantInfrastructure.error) return res.status(500).json(importantInfrastructure);
        return res.status(200).json({importantInfrastructure})
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
}

const getPropertyInquiries = async (req,res) => {
    const {userId} = req.user;
    try {
        const data = await getPropertyInquiriesFromDb(userId);
        return res.status(200).json({data});
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
}

const inquireProperty = async (req,res) => {
    const {userId} = req.user;
    const {propertyId} = req.params;
    try{
        const inquiry = await getPropertyInquiry(userId, propertyId);
        if(inquiry.length > 0 ) return res.status(400).json({error: 'You have already inquired this property'});

        if( firstName === undefined || lastName === undefined || username === undefined || email === undefined ) return res.status(400).json({error: 'Missing required fields'});

        let  createdAt = getTimeWithTimeZone();
        let defaultStatus = 1;
        let createInquiry = await createPropertyInquiry(userId, propertyId, defaultStatus, createdAt);
        if (createInquiry.error) return res.status(500).json({createInquiry});

        return res.status(200).json({success: "Property inquiry created successfully"});
    } 
    catch{
        console.log(error);
        return res.status(500).json(error);
    }
}

const cancelPropertyInquiry = async (req,res) => {
    const {userId} = req.user;
    const {propertyId} = req.params;
    try {
        let inquiry = await getPropertyInquiry(userId, propertyId);
        if (inquiry.length === 0) return res.status(400).json({error: "Property inquiry not found"});

        let status = 2;
        let cancelInquiry = await updatePropertyInquiryStatus(userId, propertyId, status);
        if (cancelInquiry.error) return res.status().json(cancelInquiry);

        return res.status(200).json({success: "Property inquiry canceled"});
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
}

const getSavedProperties = async (req,res) => {
    const {userId} = req.user;
    try {
        const data = await getSavedPropertiesFromdb(userId);
        return res.status(200).json({data});
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
}

const saveProperty = async (req,res) => {
    const {userId} = req.user;
    const {propertyId} = req.params;
    try{
        const savedProperty = await getSavedProperty(userId, propertyId);
        if(savedProperty.length > 0 ) return res.status(400).json({error: 'You have already saved this property'});

        let saveProperty_ = await createSavedProperty(userId, propertyId);
        if (saveProperty_.error) return res.status(500).json(saveProperty_);

        return res.status(200).json({success: "Property saved successfully"});
    } 
    catch{
        console.log(error);
        return res.status(500).json(error);
    }
}

const unsaveProperty = async (req,res) => {
    const {userId} = req.user
    const {propertyId} = req.params
    try {
        const savedProperty = await getSavedProperty(userId, propertyId);
        if(savedProperty.length === 0 ) return res.status(400).json({error: 'Saved property not found'});

        let unsaveProperty_ = await deleteSavedProperty(userId, propertyId);
        if (unsaveProperty_.error) return res.status(500).json(unsaveProperty_);

        return res.status(200).json({success: "Property unsaved successfully"});
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
}

export { inquireProperty, cancelPropertyInquiry, saveProperty, unsaveProperty, getPropertyInquiries, getSavedProperties, getAllProperties, getProperty, getImportantInfrestrucutre, getFeaturedProperties, getNearbyProperties }