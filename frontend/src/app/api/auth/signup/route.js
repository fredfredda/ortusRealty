import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_ENDPOINT}/api/users/signup`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(body),
      }
    );
    const data = await response.json();
    if (data.error) {
      console.error(data.error);
      return NextResponse.json({ error: data.error });
    } else {
      cookies().set("token", data.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        path: "/",
        maxAge: 1 * 24 * 60 * 60 * 1000,
      });
      return NextResponse.json(data);
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "An error occurred" });
  }
}
