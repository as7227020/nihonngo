import { NextAuthOptions } from "next-auth";
import LineProvider from "next-auth/providers/line";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import GithubProvider from "next-auth/providers/github";
import prisma from "../prisma";

export const nextAuthOptions: NextAuthOptions = {
  debug: false,
  providers: [
    LineProvider({
      clientId: process.env.LINE_CLIENT_ID!,
      clientSecret: process.env.LINE_CLIENT_SECRET!,

      //issuer:'https://nihonngo.vercel.app/auth/realms/Test'
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
  ],
  adapter: PrismaAdapter(prisma),
  callbacks: {
    session: ({ session, user }) => {
      return {
        ...session,
        user: {
          ...session.user,
          id: user.id,
          email: user.email,
        },
      };
    },
  },
  secret: process.env.NEXTAUTH_SECRET!,
};
