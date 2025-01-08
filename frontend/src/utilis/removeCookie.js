"use server";
import { cookies } from "next/headers";

const removeCookie = (cookieName) => {
    cookies().set({
        name: cookieName,
        value: "",  // Set to empty string
        maxAge: 0,  // Expire immediately
        path: "/",  // Ensure the path matches the cookie you set
    });
};

export default removeCookie;