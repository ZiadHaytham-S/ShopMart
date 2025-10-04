import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

const protectedPages = ['/cart' , '/profile']
const authPages = ['/login' , '/register']
export default async function Middleware(req:NextRequest) {
    const token = await getToken({req})

    if (protectedPages.includes(req.nextUrl.pathname)) {
        if (token) {
           
            return NextResponse.next()
        }else{
            const redirectURL =  new URL('/login' , process.env.NEXTAUTH_URL)
            redirectURL.searchParams.set('callback-url' , req.nextUrl.pathname)
            return NextResponse.redirect(redirectURL)
        }

    }

    if (authPages.includes(req.nextUrl.pathname)) {
        if (!token) {
           
            return NextResponse.next()
        }else{
            const redirectURL = new URL('/' , process.env.NEXTAUTH_URL)
            return NextResponse.redirect(redirectURL)
        }

    }

    return NextResponse.next()
}