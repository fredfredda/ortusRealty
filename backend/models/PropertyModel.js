import { db } from "../server.js";

const getAllPropertiesFromDb = async () => {
  try {
    const results = await db.query(
      `select properties.id, properties.prpty_name, properties.prpty_price, properties.prpty_size, 
            properties.prpty_location, property_saletypes.saletype_name, provinces.prvc_name, 
            properties.images, properties.is_featured, property_types.property_type, property_categories.category_name, 
            home_details.num_of_beds, home_details.num_of_bathrooms from properties 
            join property_saletypes on properties.prpty_saletype_id = property_saletypes.id 
            join property_types on properties.prpty_type_id = property_types.id 
            join property_categories on properties.category_id = property_categories.id 
            left outer join home_details on properties.home_details_id = home_details.home_details_id
            join neighborhoods on properties.prpty_nbhd_id = neighborhoods.id
            join provinces on neighborhoods.nbhd_province_id = provinces.id`
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
            properties.prpty_location, property_saletypes.saletype_name, properties.images, properties.is_featured, property_types.property_type, property_categories.category_name, 
            home_details.num_of_beds, home_details.num_of_bathrooms from properties 
            join property_saletypes on properties.prpty_saletype_id = property_saletypes.id 
            join property_types on properties.prpty_type_id = property_types.id 
            join property_categories on properties.category_id = property_categories.id 
            left outer join home_details on properties.home_details_id = home_details.home_details_id
            where properties.is_featured = 'yes';`
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
            properties.prpty_location, property_saletypes.saletype_name, properties.images, properties.is_featured, property_types.property_type, property_categories.category_name, 
            home_details.num_of_beds, home_details.num_of_bathrooms from properties 
            join property_saletypes on properties.prpty_saletype_id = property_saletypes.id 
            join property_types on properties.prpty_type_id = property_types.id 
            join property_categories on properties.category_id = property_categories.id 
            left outer join home_details on properties.home_details_id = home_details.home_details_id
            where properties.prpty_nbhd_id = ${neighborhoodId} and properties.id != ${propertyId};`
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
			properties.prpty_nbhd_id, properties.images, properties.is_featured, property_types.property_type, 
			property_categories.category_name, home_details.num_of_beds, home_details.num_of_bathrooms,
			home_details.internal_features, home_details.external_features, properties.prpty_nbhd_id from properties 
            join property_saletypes on properties.prpty_saletype_id = property_saletypes.id 
            join property_types on properties.prpty_type_id = property_types.id 
            join property_categories on properties.category_id = property_categories.id 
            left outer join home_details on properties.home_details_id = home_details.home_details_id
            join neighborhoods on properties.prpty_nbhd_id = neighborhoods.id
            join provinces on neighborhoods.nbhd_province_id = provinces.id
            where properties.id = ${propertyId};`
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

const getPropertyInquiriesFromDb = async (userId) => {
  try {
    const results = await db.query(
      `select * from property_inquiries where user_id = ${userId};`
    );
    const data = results.rows;
    return data;
  } catch (error) {
    console.log(error);
    return { error };
  }
};

const getPropertyInquiry = async (userId, propertyId) => {
  try {
    const result = await db.query(
      `select * from property_inquiries where user_id = ${userId} and property_id = ${propertyId};`
    );
    let data = result.rows;
    return data;
  } catch (error) {
    console.log(error);
    return { error };
  }
};

const createPropertyInquiry = async (
  userId,
  propertyId,
  defaultStatus,
  createdAt
) => {
  try {
    await db.query(
      `insert into property_inquiries (prpty_id, inquiry_status_id, user_id, created_at) values (${propertyId}, ${defaultStatus}, ${userId}, '${createdAt}');`
    );
    return { success: "Property inquiry created" };
  } catch (error) {
    console.log(error);
    return { error };
  }
};

const updatePropertyInquiryStatus = async (userId, propertyId, status) => {
  try {
    await db.query(
      `update property_inquiries set inquiry_status_id = ${status} where user_id = ${userId} and prpty_id = ${propertyId};`
    );
    return { success: "Property Inquiry status updated" };
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
            where saved_properties.user_id = ${userId};`);
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

export {
  getPropertyInquiry,
  createPropertyInquiry,
  updatePropertyInquiryStatus,
  getSavedProperty,
  createSavedProperty,
  deleteSavedProperty,
  getPropertyInquiriesFromDb,
  getSavedPropertiesFromdb,
  getAllPropertiesFromDb,
  getPropertyFromDb,
  getImportantInfrestrucutreFromDb,
  getFeaturedPropertiesFromDb,
  getNearbyPropertiesFromDb,
  getSavedPropertiesDetailsFromDb,
};
