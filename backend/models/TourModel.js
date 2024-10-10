import { db } from "../server.js";

const getTourRequestsFromDb = async (userId) => {
    try {
        const results = await db.query(`select * from tour_inquiries where user_id = ${userId};`);
        const data = results.rows;
        return data;
    } catch (error) {
        console.log(error);
        return {error};
    }
}

const getTourRequest = async (userId, propertyId) => {
    try {
        const results = await db.query(`select * from tour_inquiries where user_id = ${userId} and prpty_id = ${propertyId};`);
        const data = results.rows;
        return data;
    } catch (error) {
        console.log(error);
        return {error};
    }
}

const createTourRequest = async (userId, propertyId, defaultStatus, time, date) => {
    try {
        await db.query(`insert into tour_inquiries (user_id, prpty_id, tour_inquiry_status_id, tour_time, tour_date) values(${userId}, ${propertyId}, ${defaultStatus}, '${time}', '${date}');`);
        return {success: "Tour request inserted into db"};
    } catch (error) {
        console.log(error);
        return {error};
    }
}

const updateTourRequest = async (userId, propertyId, time, date) => {
    try {
        await db.query(`update tour_inquiries set tour_time = '${time}', tour_date = '${date}' where user_id = ${userId} and prpty_id = ${propertyId};`);
        return {success: "Tour request updated"};

    } catch (error) {
        console.log(error);
        return {error};
    }
}

const updateTourRequestStatus = async (userId, propertyId, status) => {
    try {
        await db.query(`update tour_inquiries set tour_inquiry_status_id = ${status} where user_id = ${userId} and prpty_id = ${propertyId};`);
        return {success: "Tour request status updated"};
    } catch (error) {
        console.log(error);
        return {error};
    }
}

export { getTourRequest, createTourRequest, updateTourRequest, updateTourRequestStatus, getTourRequestsFromDb }