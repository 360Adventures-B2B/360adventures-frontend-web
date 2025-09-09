import { getToken } from "next-auth/jwt";
import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  async function middleware(req) {
    const session = await getToken({ req });
    const path = req.nextUrl.pathname;
    const searchParams = req.nextUrl.searchParams;
    const resetToken = searchParams.get("token");

    const enableApprovalCheck = process.env.ENABLE_APPROVAL_CHECK === "true";

    const publicRoutes = [
      "/login",
      "/register",
      "/forgot-password",
      "/privacy-policy",
      "/terms-condition",
    ];
    const isPublicRoute = publicRoutes.includes(path);

    // -------------------- OTP Flow --------------------
    if (session && !session.isVerify) {
      if (path !== "/otp") {
        return NextResponse.redirect(new URL("/otp", req.url));
      }
      return NextResponse.next();
    }

    if (session?.isVerify && path === "/otp") {
      return NextResponse.redirect(new URL("/", req.url));
    }

    // -------------------- Approval Check (Global) --------------------
    if (
      enableApprovalCheck &&
      session?.isVerify &&
      !session.isApprove &&
      path !== "/account-review"
    ) {
      return NextResponse.redirect(new URL("/account-review", req.url));
    }

    // -------------------- /account-review access (must login & verify) --------------------
    if (path === "/account-review") {
      if (!session) {
        return NextResponse.redirect(new URL("/login", req.url));
      }
      if (!session.isVerify) {
        return NextResponse.redirect(new URL("/otp", req.url));
      }
      if (session.isApprove && enableApprovalCheck) {
        return NextResponse.redirect(new URL("/", req.url));
      }
      return NextResponse.next();
    }

    // -------------------- Reset Password --------------------
    if (path === "/reset-password") {
      if (!resetToken) {
        return NextResponse.redirect(new URL("/", req.url));
      }
      return NextResponse.next();
    }

    // -------------------- Payment Topup --------------------
    if (
      (path === "/payment-topup/success" ||
        path === "/payment-topup/failure") &&
      !searchParams.get("orderId")
    ) {
      return NextResponse.redirect(new URL("/", req.url));
    }
    // Allow logged-in users to access certain public routes like privacy-policy and terms-condition
    const allowPublicForAll = ["/privacy-policy", "/terms-condition"];

    if (session && isPublicRoute && !allowPublicForAll.includes(path)) {
      return NextResponse.redirect(new URL("/", req.url));
    }

    // -------------------- Block Private Route for Guest --------------------
    if (!session && !isPublicRoute && path !== "/reset-password") {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ req, token }) => {
        const path = req.nextUrl.pathname;
        const publicRoutes = [
          "/login",
          "/register",
          "/forgot-password",
          "/privacy-policy",
          "/terms-condition",
        ];

        if (path === "/reset-password") {
          return req.nextUrl.searchParams.has("token");
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
