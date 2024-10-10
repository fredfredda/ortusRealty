import jwt from 'jsonwebtoken';

const generateTokenAndSetCookie = (email,res)=>{
    const token = jwt.sign({email}, process.env.JWT_SECRET, {
        expiresIn: '1d',
    })

    res.cookie("jwt", token,{
        httpOnly: true,
        maxAge: 1 * 24 * 60 * 60 * 1000,
        sameSite: "strict",
    })

    return token;
}

export default generateTokenAndSetCookie;