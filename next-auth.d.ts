import NextAuth from "next-auth/next";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      token: string;
      isVerify: boolean;
      isApprove: boolean;
    } & DefaultSession["user"];
  }

  interface User {
    token: string;
    isVerify: boolean;
    isApprove: boolean;
  }
}
