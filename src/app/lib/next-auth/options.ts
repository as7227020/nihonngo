import { NextAuthOptions } from "next-auth";
import LineProvider from "next-auth/providers/line";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "../prisma";

export const nextAuthOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  debug: false,
  providers: [
    LineProvider({
      clientId: process.env.LINE_CLIENT_ID!,
      clientSecret: process.env.LINE_CLIENT_SECRET!,
      //issuer:'https://nihonngo.vercel.app/auth/realms/Test'
    }),
  ],
  callbacks: {
    session: ({ session, user }) => {
      return {
        ...session,
        user: {
          ...session.user,
          id: user.id,
        },
      };
    },
  },
  secret: process.env.NEXTAUTH_SECRET!,
};
