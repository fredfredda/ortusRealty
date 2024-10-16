import { getUserByUsername, getUserByEmail, getUserById, createUser, updateUser, deleteUser} from '../models/UserModel.js';
import bcrypt from 'bcrypt';
import generateTokenAndSetCookie from '../utils/helpers/generateTokenAndSetCookie.js';
import getTimeWithTimeZone from '../utils/helpers/getTimeWithTimeZone.js';
import assignId from '../utils/helpers/assignId.js';

const saltRounds = 2;

const userSignUp = async (req,res) => {
    const {firstName, lastName, email, password} = req.body;
    const username = assignId();
    try {
        const newUser = await getUserByEmail(email); // REMEMBER TO CHANGE THE PARAMETER TO [emailn]
        if (newUser.length > 0) return res.status(200).json({error: "There is a user with the same username"});

        if( firstName === undefined || lastName === undefined || email === undefined || password === undefined ) return res.status(400).json({error: 'All fields are required'});

        bcrypt.hash(password, saltRounds, async(error, hashed_password) => {
            if(error){
                console.error("Error hashing password:", error);
                return res.status(500).json(error);
            }
            let  createdAt = getTimeWithTimeZone();
            let insertUser = await createUser(firstName, lastName, email, username, hashed_password, createdAt);
            if(insertUser.error) return res.status(500).json(insertUser);
            
            const user = await getUserByEmail(email);
            generateTokenAndSetCookie(user[0].id, user[0].email, user[0].username, res);
            console.log('user registered');
            return res.status(201).json({
                userId: user[0].id,
                email: user[0].email,
                username: user[0].username,
            });
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
}

const userLogin = async (req,res) => {
    const {email,password} = req.body;
    try {
        const user = await getUserByEmail(email);
        if (user.length === 0) return res.status(400).json({error: "User not found"});

        const hashed_password = user[0].pswrd;
        const isPasswordCorrect = await bcrypt.compare(password, hashed_password);
        if (isPasswordCorrect === false) return res.status(400).json({error: "Incorrect password"});

        generateTokenAndSetCookie(user[0].id, user[0].email, user[0].username, res);

        console.log('user logged in');

        return res.status(201).json({
            userId: user[0].id,
            email: user[0].email,
            username: user[0].username,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
}

const userLogout =  (req,res) => {
    try {
        res.cookie("jwt","",{maxAge:1});
        console.log('user logged out');
        return res.status(200).json({ success: "Log out successful"});
    } catch (error) {
        return res.status(500).json({error: error});
    }
}

const editProfile = async(req,res) => {
    const {userId} = req.user;
    const {firstName, lastName, username, email, password} = req.body;
    try {
        if (firstName === undefined || lastName === undefined || username === undefined || email === undefined || password === undefined) return res.status(400).json({error: "Missing required fields"});

        const hashed_password = bcrypt.hash(password, saltRounds, async(error, hashed_password) => {
            if(error){
                console.error("Error hashing password:", error);
                return res.status(500).json(error);
            }
            return hashed_password;
        })
        let modifyUser =  await updateUser(userId, firstName, lastName, username, email, hashed_password);
        if (modifyUser.error) return res.status(500).json(modifyUser);
        
        return res.status(200).json({success: "Profile updated successfully"});
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
}

const deleteAccount = async(req,res) => {
    const {userId} = req.user;
    try {
        user = await getUserById(userId);
        if (user.length === 0) return res.status(400).json({error: "User not found"});     

        await userLogout();

        removeUser = await deleteUser(userId);
        if (removeUser.error) return res.status(500).json(removeUser);
    } catch (error) {
        console.log(error);
        return res.status(500).json({error: error});
    }
}

export { userSignUp, userLogin, userLogout, editProfile, deleteAccount};