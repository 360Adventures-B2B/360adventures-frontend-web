// middleware.ts
import { withAuth } from "next-auth/middleware";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const path = req.nextUrl.pathname;

    const searchParams = req.nextUrl.searchParams;
    const resetToken = searchParams.get("token");

    const publicRoutes = ["/login", "/register", "/forgot-password"];
    const isPublicRoute = publicRoutes.includes(path);

    if (path === "/reset-password") {
      if (!resetToken) {
        return redirect('/');
      }
      return NextResponse.next();
    }

    if (req.nextauth.token && isPublicRoute) {
      return NextResponse.redirect(new URL("/", req.url));
    }

    // Jika belum login, redirect ke home
    if (!req.nextauth.token && !isPublicRoute) {
      return NextResponse.redirect(new URL("/", req.url));
    }
  },
  {
    callbacks: {
      authorized: ({ req, token }) => {
        const path = req.nextUrl.pathname;
        const publicRoutes = ["/login", "/register", "/forgot-password"];

        if (path === "/reset-password") {
          const hasToken = req.nextUrl.searchParams.has("token");
          return hasToken;
        }

        if (publicRoutes.includes(path)) {
          return true;
        }

        return !!token;
      },
    },
  }
);

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|img|favicon.ico).*)"],
};
