"use server";
import { cookies } from "next/headers";
import { SignJWT, jwtVerify } from "jose";
import { redirect } from "next/navigation";

const secretKey = "secret";
const key = new TextEncoder().encode(secretKey);

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
    const expires = new Date(Date.now() + (1 * 24 * 60 * 60 * 1000));
    const session = await encrypt({user, expires});
    cookies().set('session', session, {
        expires,
        httpOnly: true
    });
}

const handleLogout = async () => {
    cookies().set('session', '', { expires: new Date(0) });
}

const getSession = async () => {
    const session = cookies().get('session')?.value;
    if(!session) return null;
    return await decrypt(session);
}

export { handleLogin, handleLogout, getSession }