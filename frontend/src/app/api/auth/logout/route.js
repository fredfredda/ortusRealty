import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(req) {
  try {
    const token = cookies().get("token")?.value;
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_ENDPOINT}/api/users/logout`,
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
        method: "POST",
        credentials: "include",
      }
    );
    const data = await response.json();
    if (data.error) {
      console.error(data.error);
      return NextResponse.json({ error: data.error });
    } else if (data.success) {
      cookies().delete("token");
      return NextResponse.json(data);
    }
  } catch (error) {
    console.log(error);
  }
}
