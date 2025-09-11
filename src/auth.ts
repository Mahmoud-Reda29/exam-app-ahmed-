import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { AuthResponse } from "./lib/types/auth";

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: "/login",
  },
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        const response = await fetch(
          `${process.env.BASE_URL!}${process.env.LOGIN_URL!}`,
          {
            method: "POST",
            body: JSON.stringify({
              email: credentials?.email,
              password: credentials?.password,
            }),
            headers: { "Content-Type": "application/json" },
          }
        );
        const payload: ApiResponse<AuthResponse> = await response.json();

        if ("code" in payload) {
          throw new Error("Email or password wrong");
        }

        return {
          id: payload.user._id,
          accessToken: payload.token,
          ...payload.user,
        };
      },
    }),
  ],
  callbacks: {
    // Handles token logic
    jwt: async ({ token, user, trigger, session }) => {
      // On first login, attach user data
      if (user) {
        return { ...token, ...user };
      }

      // When update is triggered, merge new session data
      if (trigger === "update" && session) {
        return { ...token, ...session };
      }

      return token;
    },

    // Maps token data into the session object
    session: ({ session, token }) => {
      session._id = token._id;
      session.email = token.email as string;
      session.firstName = token.firstName as string;
      session.lastName = token.lastName as string;
      session.username = token.username as string;
      session.role = token.role as "user" | "admin";
      session.createdAt = token.createdAt as string;
      session.phone = token.phone as string;
      session.isVerified = token.isVerified as boolean;

      return session;
    },
  },
};
