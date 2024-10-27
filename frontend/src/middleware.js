import { NextRequest, NextResponse } from "next/server";

const middleware = async (req) => {
  const protectedRoutes = ["/profile", "/saved-properties"];
  const currentPath = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.includes(currentPath);
  const authRoutes = ["/login", "/register"];
  const isAuthRoute = authRoutes.includes(currentPath);
  if (isProtectedRoute) {
    const cookie = req.cookies.get('jwt');
    if (!cookie) {
      return NextResponse.redirect(new URL(`/login?redirect=${currentPath}`, req.url));
    }
  }
  
  if (isAuthRoute) {
    const cookie = req.cookies.get('jwt');
    if (cookie) {
      return NextResponse.redirect( new URL("/", req.url));
    }
  }

  return NextResponse.next();
};

export { middleware };
