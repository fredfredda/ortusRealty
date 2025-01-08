import jwt from 'jsonwebtoken';

const generateTokenAndSetCookie = (userId, email, username, res)=>{
    const token = jwt.sign({userId, email, username}, process.env.JWT_SECRET, {
        expiresIn: '1d',
    })

    res.cookie("jwt", token,{
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production' ? true : false,
        maxAge: 1 * 24 * 60 * 60 * 1000,
        sameSite: "None",
    })

    return token;
}

export default generateTokenAndSetCookie;