import GitHub from "next-auth/providers/github"
import type { NextAuthConfig, Session, User } from "next-auth"
import Google from "next-auth/providers/google"
import Credentials from "next-auth/providers/credentials"
import { getUser } from "./userHandler"

interface CustomUser extends User {
   role?: string
}

export default {
   providers: [
      GitHub,
      Google,
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
               throw new Error("Invalid credentials.")
            }

            user = res.user as CustomUser

            return user

         }

      })
   ],
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
         session.user.role = token.role
         return {
            ...session,
            id : token.id as String,
            role: token.role
         }
      }
   }
} satisfies NextAuthConfig
