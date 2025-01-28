import { NextResponse } from "next/server";

const middleware = async (req) => {
  const protectedRoutes = ["/profile", "/saved-properties"];
  const authRoutes = ["/login", "/register", "/reset-password"];
  const currentPath = req.nextUrl.pathname;
  const cookie = req.cookies.get("jwt");

  if (protectedRoutes.includes(currentPath)) {
    if (!cookie) {
      return NextResponse.redirect(
        new URL(`/login?redirect=${currentPath}`, req.url)
      );
    }
  }

  if (authRoutes.includes(currentPath)) {
    if (cookie) {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  return NextResponse.next();
};

export { middleware };