import { db } from "../server.js";

const getUserByUsername = async(username) => {
    try {
        const result = await db.query(`select * from users where username = '${username}';`);
        let data = result.rows;
        return data
    } catch (error) {
        console.log(error);
        return {error};
    }
}

const getUserByEmail = async(email) => {
    try {
        const result = await db.query(`select * from users where email = '${email}';`);
        let data = result.rows;
        return data
    } catch (error) {
        console.log(error);
        return {error};
    }
}

const getUserById = async(userId) => {
    try {
        const result = await db.query(`select * from users where id = ${userId};`);
        let data = result.rows;
        return data
    } catch (error) {
        console.log(error);
        return {error};
    }
}

const createUser = async(firstName, lastName, email, username, hashed_password, createdAt) => {
    try {
        await db.query(`insert into users (first_name, last_name, email, username, pswrd, created_at) values ( '${firstName}', '${lastName}', '${email}', '${username}', '${hashed_password}', '${createdAt}');`);
        return {success: "user inserted into database"};
    } catch (error) {
        console.log(error);
        return {error};
    }
}

const updateUser = async (userId, firstName, lastName) => {
    try {
        await db.query(`update users set first_name = '${firstName}', last_name = '${lastName}' where id = ${userId};`);
        return {success: "User updated successfully"};
    } catch (error) {
        console.log(error);
        return {error};
    }
}

const updatePassword = async ( userId, hashedPassword ) => {
    try {
        await db.query(`update users set pswrd = '${hashedPassword}' where id = ${userId};`);
        return {success: "Password updated successfully"};
    } catch (error) {
        console.log(error);
        return {error};
    }
}

const deleteUser = async (userId) => {
    try {
        await db.query(`delete from users where id = ${userId};`);
        return {success: "User deleted successfully"};
    } catch (error) {
        console.log(error);
        return {error};
    }
}

const getAgentsFromDb = async () => {
    try {
        const results = await db.query(`select first_name, last_name, email, profile_pic from agents;`);
        const data = results.rows;
        return data;
    } catch (error) {
        console.log(error);
        return { error };
    }
}

export {getUserByUsername,
    getUserByEmail,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    updatePassword,
    getAgentsFromDb,
};