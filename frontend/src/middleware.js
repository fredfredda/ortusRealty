import { NextResponse } from "next/server";
import { cookies } from "next/headers";

const middleware = async (req) => {
  const protectedRoutes = ["/profile", "/saved-properties", "/compare", "/investor-module"];
  const authRoutes = ["/login", "/register", "/reset-password"];
  const currentHref = req.nextUrl.href;
  const currentPath = req.nextUrl.pathname;
  const cookie = cookies().get("token")?.value;

  if (
    protectedRoutes.some((protectedRoute) =>
      currentHref.includes(protectedRoute)
    )
  ) {
    if (!cookie) {
      return NextResponse.redirect(
        new URL(`/login?redirect=${currentPath}`, req.url)
      );
    }
  }

  if (authRoutes.some((authRoute) => currentHref.includes(authRoute))) {
    if (cookie) {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  return NextResponse.next();
};

export { middleware };
