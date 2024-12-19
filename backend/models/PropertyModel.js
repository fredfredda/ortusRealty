import { db } from "../server.js";

const getAllPropertiesFromDb = async () => {
  try {
    const results = await db.query(
      `select properties.id, properties.prpty_name, properties.prpty_price, properties.prpty_size, 
            properties.prpty_location, property_saletypes.saletype_name, provinces.prvc_name, 
            properties.images, properties.is_featured, properties.status_id, property_types.property_type, property_categories.category_name, 
            home_details.num_of_beds, home_details.num_of_bathrooms from properties 
            join property_saletypes on properties.prpty_saletype_id = property_saletypes.id 
            join property_types on properties.prpty_type_id = property_types.id 
            join property_categories on properties.category_id = property_categories.id 
            left outer join home_details on properties.home_details_id = home_details.home_details_id
            join neighborhoods on properties.prpty_nbhd_id = neighborhoods.id
            join provinces on neighborhoods.nbhd_province_id = provinces.id
            where properties.status_id = 3;`
    );
    const data = results.rows;
    return data;
  } catch (error) {
    console.log(error);
    return { error };
  }
};

const getAgentPropertiesFromDb = async (agentId) => {
  try {
    const results = await db.query(
      `select properties.id, properties.prpty_name, properties.prpty_price, properties.prpty_size, 
            properties.prpty_location, property_saletypes.saletype_name, provinces.prvc_name, 
            properties.images, properties.is_featured, properties.status_id, property_types.property_type, property_categories.category_name, 
            home_details.num_of_beds, home_details.num_of_bathrooms from properties 
            join property_saletypes on properties.prpty_saletype_id = property_saletypes.id 
            join property_types on properties.prpty_type_id = property_types.id 
            join property_categories on properties.category_id = property_categories.id 
            left outer join home_details on properties.home_details_id = home_details.home_details_id
            join neighborhoods on properties.prpty_nbhd_id = neighborhoods.id
            join provinces on neighborhoods.nbhd_province_id = provinces.id
            where properties.agent_id = ${agentId} and properties.status_id = 3;`
    );
    const data = results.rows;
    return data;
  } catch (error) {
    console.log(error);
    return { error };
  }
};

const getFeaturedPropertiesFromDb = async () => {
  try {
    const results = await db.query(
      `select properties.id, properties.prpty_name, properties.prpty_price, properties.prpty_size, 
            properties.prpty_location, properties.status_id, property_saletypes.saletype_name, properties.images, properties.is_featured, property_types.property_type, property_categories.category_name, 
            home_details.num_of_beds, home_details.num_of_bathrooms from properties 
            join property_saletypes on properties.prpty_saletype_id = property_saletypes.id 
            join property_types on properties.prpty_type_id = property_types.id 
            join property_categories on properties.category_id = property_categories.id 
            left outer join home_details on properties.home_details_id = home_details.home_details_id
            where properties.is_featured = 'yes' and properties.status_id = 3;`
    );
    const data = results.rows;
    return data;
  } catch (error) {
    console.log(error);
    return { error };
  }
};

const getNearbyPropertiesFromDb = async (neighborhoodId, propertyId) => {
  try {
    const results = await db.query(
      `select properties.id, properties.prpty_name, properties.prpty_price, properties.prpty_size, 
            properties.prpty_location, properties.status_id, property_saletypes.saletype_name, properties.images, properties.is_featured, property_types.property_type, property_categories.category_name, 
            home_details.num_of_beds, home_details.num_of_bathrooms from properties 
            join property_saletypes on properties.prpty_saletype_id = property_saletypes.id 
            join property_types on properties.prpty_type_id = property_types.id 
            join property_categories on properties.category_id = property_categories.id 
            left outer join home_details on properties.home_details_id = home_details.home_details_id
            where properties.prpty_nbhd_id = ${neighborhoodId} and properties.id != ${propertyId} and properties.status_id = 3;`
    );
    const data = results.rows;
    return data;
  } catch (error) {
    console.log(error);
    return { error };
  }
};

const getPropertyFromDb = async (propertyId) => {
  try {
    const results = await db.query(
      `select properties.id, properties.prpty_name, properties.prpty_price, properties.prpty_size,
			properties.prpty_description, properties.prpty_latitude, properties.prpty_longitude,
            properties.prpty_location, property_saletypes.saletype_name, provinces.prvc_name,
			properties.prpty_nbhd_id, properties.images, properties.is_featured, properties.agent_id, property_types.property_type, 
			property_categories.category_name, home_details.num_of_beds, home_details.num_of_bathrooms,
			home_details.internal_features, home_details.external_features, properties.prpty_nbhd_id, neighborhoods.nbhd_name, home_categories.home_category
      from properties 
            join property_saletypes on properties.prpty_saletype_id = property_saletypes.id 
            join property_types on properties.prpty_type_id = property_types.id 
            join property_categories on properties.category_id = property_categories.id 
            left outer join home_details on properties.home_details_id = home_details.home_details_id
            join neighborhoods on properties.prpty_nbhd_id = neighborhoods.id
            join provinces on neighborhoods.nbhd_province_id = provinces.id
            left outer join home_categories on home_details.home_category_id = home_categories.id
            where properties.id = ${propertyId} and properties.status_id = 3;`
    );
    const data = results.rows;
    return data;
  } catch (error) {
    console.log(error);
    return { error };
  }
};

const getImportantInfrestrucutreFromDb = async (neighborhoodId) => {
  try {
    const results = await db.query(
      `select *, infrastructure_types.infrastructure_type from important_facilities join infrastructure_types on important_facilities.infrastructure_type_id = infrastructure_types.id where nbhd_id = ${neighborhoodId};`
    );
    const data = results.rows;
    return data;
  } catch (error) {
    console.log(error);
    return { error };
  }
};

const getSavedPropertiesFromdb = async (userId) => {
  try {
    const result = await db.query(
      `select * from saved_properties where user_id = ${userId};`
    );
    let data = result.rows;
    return data;
  } catch (error) {
    console.log(error);
    return { error };
  }
};

const getSavedProperty = async (userId, propertyId) => {
  try {
    const result = await db.query(
      `select * from saved_properties where user_id = ${userId} and property_id = ${propertyId};`
    );
    let data = result.rows;
    return data;
  } catch (error) {
    console.log(error);
    return { error };
  }
};

const getSavedPropertiesDetailsFromDb = async (userId) => {
  try {
    const result =
      await db.query(`select saved_properties.property_id, properties.prpty_name,
            properties.prpty_price, properties.prpty_size, 
            properties.prpty_location, property_saletypes.saletype_name, properties.images,
            properties.is_featured, property_types.property_type, property_categories.category_name, 
            home_details.num_of_beds, home_details.num_of_bathrooms from saved_properties
			join properties on saved_properties.property_id = properties.id
			join property_saletypes on properties.prpty_saletype_id = property_saletypes.id 
            join property_types on properties.prpty_type_id = property_types.id 
            join property_categories on properties.category_id = property_categories.id 
            left outer join home_details on properties.home_details_id = home_details.home_details_id
            where saved_properties.user_id = ${userId} and properties.status_id = 3;`);
    let data = result.rows;
    return data;
  } catch (error) {
    console.log(error);
    return { error };
  }
};

const createSavedProperty = async (userId, propertyId) => {
  try {
    await db.query(
      `insert into saved_properties (user_id, property_id) values(${userId}, ${propertyId});`
    );
    return { success: "Saved property inserted" };
  } catch (error) {
    console.log(error);
    return { error };
  }
};

const deleteSavedProperty = async (userId, propertyId) => {
  try {
    await db.query(
      `delete from saved_properties where user_id = ${userId} and property_id = ${propertyId};`
    );
    return { success: "Saved property deleted" };
  } catch (error) {
    console.log(error);
    return { error };
  }
};

const getHomeFeaturesFromDb = async () => {
  try {
    const internalFeatures = await db.query(
      `select id, internal_feature from internal_features;`
    );
    const externalFeatures = await db.query(
      `select id, external_feature from external_features;`
    );
    const data = {
      internalFeatures: internalFeatures.rows,
      externalFeatures: externalFeatures.rows,
    };
    return data;
  } catch (error) {
    console.log(error);
    return { error };
  }
};

export {
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
};
