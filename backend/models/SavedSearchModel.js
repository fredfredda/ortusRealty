import { db } from "../server";

const getSavedSearchesFromDb = async (userId) => {
    try {
        const results = await db.query(`select * from saved_searches where user_id = ${userId};`);
        const data = results.rows;
        return data;
    } catch (error) {
        console.log(error);
        return {error};
    }
}

const createSavedSearch = async (userId, filters) => {
    try {
        await db.query(`insert into saved_searches (user_id, filters) values(${userId}, '${filters}');`);
        return {success: "Saved search created successfully"};
    } catch (error) {
        console.log(error);
        return {error};
    }
}

const getSavedSearch = async (userId, savedSearchId) => {
    try {
        const results = await db.query(`select * from saved_searches where user_id = ${userId} and id = ${savedSearchId};`);
        const data = results.rows;
        return data;
    } catch (error) {
        console.log(error);
        return {error};
    }
}

const updateSavedSearch = async (userId, savedSearchId, filters) => {
    try {
        await db.query(`update saved_searches set filters = '${filters}' where user_id = ${userId} and id = ${savedSearchId};`)
        return {success: "Saved search updated"}
    } catch (error) {
        console.log(error);
        return {error};
    }
}

const removeSavedSearch = async (userId, savedSearchId) => {
    try {
        await db.query(`delete from saved_searches where user_id = ${userId} and id = ${savedSearchId};`)
        return {success: "Saved search deleted"}
    } catch (error) {
        console.log(error);
        return {error};
    }
}

export { createSavedSearch, updateSavedSearch, getSavedSearch, removeSavedSearch, getSavedSearchesFromDb }