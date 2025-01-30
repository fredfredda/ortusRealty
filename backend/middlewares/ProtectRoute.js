import jwt from 'jsonwebtoken';
import {getUserByEmail} from "../models/UserModel.js";

const protectRoute = async (req,res,next) => {
    try{
        if(!req.headers.authorization) return res.status(401).json({ error: "Unauthorized" });
        
        const token = req.headers.authorization.split(' ')[1];
        if(!token) return res.status(401).json({ error: "Unauthorized" });

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await getUserByEmail(decoded.email);

        req.user = {
            userId: user[0].id,
            email: user[0].email,
            usename: user[0].usename,
        }

        next();

    } catch(error){
        res.status(500).json({ error: error.message});
        console.error('Error in protectRoute function: ', error.message);
    }
}

export default protectRoute;