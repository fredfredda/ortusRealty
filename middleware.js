import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { decrypt } from "./frontend/src/utilis/auth";

const middleware = async (req) => {
    const protectedRoutes = [];
    const currentPath = req.nextUrl.pathname;
    const isProtectedRoute = protectedRoutes.includes(currentPath);

    if (isProtectedRoute) {
        const cookie = cookies().get("session")?.value;
        const session = await decrypt(cookie);

        if (!session?.user) {
            return NextResponse.redirect("/login");
        }
    }

    return NextRequest.next();
};

const config = {
    matcher: ['/((?!api|_next/static|_next/image).*)'],
}



useEffect(() => {
    const checkSession = async () => {
      const session_ = await getSession();
      if (session_ !== null) {
        setSession(session_);
      } else {
        deleteSession();
      }
    };
    checkSession();
  }, []);

  useEffect(() => {
    const checkSession = async () => {
      const session_ = await getSession();
      if (session_ !== null) {
        setSession(session_);
      } else {
        deleteSession();
      }
    };
    checkSession();
  }, []);

export { middleware, config };