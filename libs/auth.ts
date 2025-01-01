import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import authConfig from "./auth.config"
import prisma from "./prismadb"

export const { auth, handlers, signIn, signOut, unstable_update } = NextAuth({
    pages: {
        signIn: "auth/signin",
    },
    adapter: PrismaAdapter(prisma),
    session: { strategy: "jwt" },
    secret: process.env.JWT_SECRET,
    ...authConfig,
})
