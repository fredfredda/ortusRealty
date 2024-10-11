"use server";
import { cookies } from "next/headers";
import { SignJWT, jwtVerify } from "jose";
import { redirect } from "next/navigation";

const secretKey = "secret";
const key = new TextEncoder().encode(secretKey);
const cookie = {
    name: "session",
    options: { httpOnly: true, secure: true, sameSite: "lax", path: "/" },
    duration: 24 * 60 * 60 * 1000,
}

const encrypt = async (payload) => {
    return await new SignJWT(payload)
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("1 day from now")
      .sign(key);
}

const decrypt = async (input) => {
    const { payload } = await jwtVerify(input, key, {
        algorithms: ['HS256'],
    })
    return payload;
}

const handleLogin = async (user) => {
    const expires = new Date(Date.now() + cookie.duration);
    const session = await encrypt({user, expires});
    cookies().set(cookie.name, session, { ...cookie.options, expires });
    redirect('/');
}

const handleLogout = async () => {
    cookies().delete(cookie.name, { path: "/" });
    redirect('/');
}

const getSession = async () => {
    const cookie_ = cookies().get(cookie.name)?.value;
    if(!cookie_) {
        return null;
    }
    const session = await decrypt(cookie_);
    return { userId: session.user.userId,
             email: session.user.email,
             username: session.user.username,
            };
}

export { decrypt, encrypt, handleLogin, handleLogout, getSession }