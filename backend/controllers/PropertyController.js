import {
  getSavedProperty,
  createSavedProperty,
  deleteSavedProperty,
  getSavedPropertiesFromdb,
  getAllPropertiesFromDb,
  getPropertyFromDb,
  getImportantInfrestrucutreFromDb,
  getFeaturedPropertiesFromDb,
  getNearbyPropertiesFromDb,
  getSavedPropertiesDetailsFromDb,
  getHomeFeaturesFromDb,
  getAgentPropertiesFromDb,
} from "../models/PropertyModel.js";

const getAllProperties = async (req, res) => {
  const { propertyType, saleType, province, priceRange, sizeRange, search } =
    req.query;
  // const { propertyType, saleType, category, homeCategory, province, search, priceRange, sizeRange } = req.query;
  try {
    let allProperties = [];
    if (req.query.agentId) {
      allProperties = await getAgentPropertiesFromDb(req.query.agentId);
    } else {
      allProperties = await getAllPropertiesFromDb();
    }
    // filter by search input
    let propertiesByName = allProperties.filter((property) =>
      property["prpty_name"].toLowerCase().includes(search.toLowerCase() || "")
    );
    // filter by property type
    let propertiesByType = propertiesByName.filter((property) =>
      property["property_type"].includes(propertyType || "")
    );
    // filter by sale type
    let propertiesBySaleType = propertiesByType.filter((property) =>
      property["saletype_name"].includes(saleType || "")
    );
    // filter by province
    let propertiesByProvince = propertiesBySaleType.filter((property) =>
      property["prvc_name"].includes(province || "")
    );
    // price and size formatting
    let priceRange_ = !priceRange ? "0-1000000000" : priceRange;
    let sizeRange_ = !sizeRange ? "0-10000" : sizeRange;
    let minPrice = priceRange_.split("-")[0];
    let maxPrice = priceRange_.split("-")[1];
    let minSize = sizeRange_.split("-")[0];
    let maxSize = sizeRange_.split("-")[1];
    // filter by price
    let propertiesByPrice = propertiesByProvince.filter(
      (property) =>
        Number(property["prpty_price"]) >= Number(minPrice) &&
        Number(property["prpty_price"]) <= Number(maxPrice)
    );
    // filter by size
    let propertiesBySize = propertiesByPrice.filter(
      (property) =>
        Number(property["prpty_size"]) >= Number(minSize) &&
        Number(property["prpty_size"]) <= Number(maxSize)
    );
   
    return res.status(200).json({ properties:propertiesBySize });
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

const getFeaturedProperties = async (req, res) => {
  try {
    let properties = await getFeaturedPropertiesFromDb();
    return res.status(200).json({ properties });
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

const getNearbyProperties = async (req, res) => {
  const { neighborhoodId, propertyId } = req.params;
  try {
    let properties = await getNearbyPropertiesFromDb(
      neighborhoodId,
      propertyId
    );
    return res.status(200).json({ properties });
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

const getProperty = async (req, res) => {
  const { propertyId } = req.params;
  try {
    let property = await getPropertyFromDb(propertyId);
    if (property.length === 0)
      return res.status(400).json({ error: "Property Not Found" });
    if (property.error) return res.status(500).json(property);
    return res.status(200).json(property[0]);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

const getImportantInfrestrucutre = async (req, res) => {
  const { neighborhoodId } = req.params;
  try {
    let importantInfrastructure = await getImportantInfrestrucutreFromDb(
      neighborhoodId
    );
    if (importantInfrastructure.error)
      return res.status(500).json(importantInfrastructure);
    return res.status(200).json({ importantInfrastructure });
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

const getSavedPropertiesDetails = async (req, res) => {
  const { userId } = req.user;
  try {
    const savedProperties = await getSavedPropertiesDetailsFromDb(userId);
    return res.status(200).json(savedProperties);
  } catch {
    console.log(error);
    return res.status(500).json(error);
  }
};

const getSavedProperties = async (req, res) => {
  const { userId } = req.user;
  try {
    const properties = await getSavedPropertiesFromdb(userId);
    return res.status(200).json({ properties });
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

const saveProperty = async (req, res) => {
  const { userId } = req.user;
  const { propertyId } = req.params;
  try {
    const savedProperty = await getSavedProperty(userId, propertyId);
    if (savedProperty.length > 0)
      return res
        .status(400)
        .json({ error: "You have already saved this property" });

    let saveProperty_ = await createSavedProperty(userId, propertyId);
    if (saveProperty_.error) return res.status(500).json(saveProperty_);

    return res.status(200).json({ success: "Property saved successfully" });
  } catch {
    console.log(error);
    return res.status(500).json(error);
  }
};

const unsaveProperty = async (req, res) => {
  const { userId } = req.user;
  const { propertyId } = req.params;
  try {
    const savedProperty = await getSavedProperty(userId, propertyId);
    if (savedProperty.length === 0)
      return res.status(400).json({ error: "Saved property not found" });

    let unsaveProperty_ = await deleteSavedProperty(userId, propertyId);
    if (unsaveProperty_.error) return res.status(500).json(unsaveProperty_);

    return res.status(200).json({ success: "Property unsaved successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

const getHomeFeatures = async (req, res) => {
  try {
    const features = await getHomeFeaturesFromDb();
    if (features.error) return res.status(500).json({ error: features });
    return res.status(200).json( features );
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error });
  }
};

export {
  saveProperty,
  unsaveProperty,
  getSavedProperties,
  getAllProperties,
  getProperty,
  getImportantInfrestrucutre,
  getFeaturedProperties,
  getNearbyProperties,
  getSavedPropertiesDetails,
  getHomeFeatures,
};
