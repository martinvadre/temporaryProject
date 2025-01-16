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
                params: { prompt: "consent", access_type: "offline", response_type: "code", scope: "openid email profile https://www.googleapis.com/auth/calendar.events" }
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
                    role: (user as Users).role,
                }
            }
            return token
        },
        async session({ session, token }: { session: any, token: any }) {
            const [googleAccount] = await prisma.account.findMany({
                where: { userId: token.id, provider: "google" },
            })

            if (googleAccount?.expires_at && googleAccount.expires_at * 1000 < Date.now()) {
                if (!googleAccount.refresh_token) {
                    throw new Error("No refresh token found");
                }

                const response = await fetch("https://oauth2.googleapis.com/token", {
                    method: "POST",
                    body: new URLSearchParams({
                        client_id: process.env.AUTH_GOOGLE_ID as string,
                        client_secret: process.env.AUTH_GOOGLE_SECRET!,
                        grant_type: "refresh_token",
                        refresh_token: googleAccount.refresh_token,
                    }),
                })

                const tokensOrError = await response.json()

                console.log(tokensOrError)

                if (!response.ok) throw tokensOrError

                const newTokens = tokensOrError as {
                    access_token: string
                    expires_in: number
                    refresh_token?: string
                }

                await prisma.account.update({
                    data: {
                        access_token: newTokens.access_token,
                        expires_at: Math.floor(Date.now() / 1000 + newTokens.expires_in),
                        refresh_token:
                        newTokens.refresh_token ?? googleAccount.refresh_token,
                    },
                    where: {
                        provider_providerAccountId: {
                            provider: "google",
                            providerAccountId: googleAccount.providerAccountId,
                        },
                    },
                })
            }

            if (session.user) {
                session.user.role = token.role
                session.user.id = token.id
                return {
                    ...session,
                    id: token.id,
                    role: token.role
                }
            }
            return session
        }
    }
} satisfies NextAuthConfig
