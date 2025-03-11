import { AuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const authOptions: AuthOptions = {
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 24, // 1 day
  },
  pages: {
    signIn: "/login",
  },
  providers: [
    Credentials({
      credentials: {
        id: {
          type: "text",
        },
        email: {
          type: "text",
        },
        name: {
          type: "text",
        },
        token: {
          type: "text",
        },
        action: { type: "hidden" },
      },
      authorize: async (credentials: Record<"id" | "name" | "email" | "token" | "action", string> | undefined, req) => {
        if (!credentials) return null;
        return {
          id: credentials.id,
          name: credentials.name,
          email: credentials.email,
          token: credentials.token,
          isVerify: credentials.action === "login",
        };
      },
    }),
  ],
  callbacks: {
    jwt: async ({ user, token, trigger, session }) => {
      if (user) {
        token.id = user.id;
        token.token = user.token;
        token.isVerify = user.isVerify;
      }

      if (trigger === "update") {
        token.isVerify = session.isVerify;
        // return { ...token, ...session.user };
      }

      return token;
    },
    session: async ({ session, token }) => {
      if (session?.user) {
        session.user.id = token.id;
        session.user.token = token.token as string;
        session.user.isVerify = token.isVerify;
      }
      return session;
    },
  },
};

export default authOptions;
