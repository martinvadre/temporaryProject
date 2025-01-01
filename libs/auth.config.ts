    import GitHub from "next-auth/providers/github"
    import { AuthError, type NextAuthConfig, type Session, type User } from "next-auth"
    import Google from "next-auth/providers/google"
    import Credentials from "next-auth/providers/credentials"
    import { getUser } from "./userHandler"
    import bcypt from "bcryptjs"
    import prisma from "./prismadb"

interface CustomUser extends User {
    role?: string
    password?: string
}

export default {
    providers: [
        GitHub,
        Google({
            allowDangerousEmailAccountLinking: true,
        }),
        Credentials({
            credentials: {
                email: {},
                password: {},
            },
            async authorize(credentials) {
                const { email, password } = credentials as { email: string, password: string }

                let user: CustomUser;

                const res = await getUser(email as string);

                if (res.status == "error") {
                    throw new AuthError(res.message as string, {
                        cause: {type: "Verification" }
                    });
                }

                if ((res.user as CustomUser).password == null) {
                    return null
                }

                if (!bcypt.compareSync(password, (res.user as CustomUser).password as string)) {
                    return null
                }

                user = res.user as CustomUser

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
                token.role = (user as CustomUser).role
                return {
                    ...token,
                    id: (user as CustomUser).id,
                    role: (user as CustomUser).role
                }
            }
            return token
        },
        async session({session, token}) {
            (session.user as CustomUser).role = token.role as string | undefined
            return {
                ...session,
                id : token.id as String,
                role: token.role
            }
        }
    }
} satisfies NextAuthConfig
