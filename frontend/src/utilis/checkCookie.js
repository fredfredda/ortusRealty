"use server";
import { cookies } from "next/headers";

export const checkCookie = () => {
    const cookie = cookies().get("token")?.value;
    if (!cookie) return false;
    return true;
};