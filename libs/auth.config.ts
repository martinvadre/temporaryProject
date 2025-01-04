import GitHub from "next-auth/providers/github"
import { AuthError, type NextAuthConfig, type Session, type User } from "next-auth"
import Google from "next-auth/providers/google"
import Credentials from "next-auth/providers/credentials"
import { getUser } from "./userHandler"
import bcypt from "bcryptjs"
import prisma from "./prismadb"
import { Users } from "@/libs/interfaces"

export default {
    providers: [
        GitHub,
        Google({
            allowDangerousEmailAccountLinking: true,
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET,
            authorization: {
                params: { prompt: "select_account", access_type: "offline", response_type: "code", scope: "openid email profile https://www.googleapis.com/auth/calendar.events" }
            }
        }),
        Credentials({
            credentials: {
                email: {},
                password: {},
            },
            async authorize(credentials) {
                const { email, password } = credentials as { email: string, password: string }

                let user: Users;

                const res = await getUser(email as string);

                if (res.status == "error") {
                    return null
                }

                if ((res.user as Users).emailVerified === null) {
                    throw new AuthError(res.message as string, {
                        cause: {type: "Verification" }
                    });
                }

                if ((res.user as Users).password == null) {
                    return null
                }

                if (!bcypt.compareSync(password, (res.user as Users).password as string)) {
                    return null
                }

                user = res.user as Users

                return user

            }

        })
    ],
    events: {
        async linkAccount({ user }) {
            await prisma.user.update({
                where: { id: user.id },
                data: { emailVerified: new Date() }
            })
        }
    },
    callbacks: {
        async jwt({token, user}) {
            if (user) {
                token.role = (user as Users).role
                token.id = (user as Users).id
                return {
                    ...token,
                    id: (user as Users).id,
                    role: (user as Users).role
                }
            }
            return token
        },
        async session({session, token}) {
            (session.user as Users).role = token.role as string | undefined
            (session.user as Users).id = token.id as string | undefined
            return {
                ...session,
                id : token.id,
                role: token.role
            }
        }
    }
} satisfies NextAuthConfig
