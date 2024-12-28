import { auth } from "@/libs/auth";
import { NextRequest, NextResponse } from "next/server";

export default async function middleware(req: NextRequest) {
   const session = await auth()

   const { pathname } = req.nextUrl;
   if (!session && !pathname.includes("/auth")) return NextResponse.redirect(new URL('/auth/signin', req.url))

   if (session && (pathname.includes("/auth"))) return NextResponse.redirect(new URL('/dev/test/loggedIn', req.url))

   return NextResponse.next()
}

export const config = {
   matcher: ['/dev/:path*', '/((?!api|_next|.*\\..*).*)'],
}
