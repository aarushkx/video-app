import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
export { default } from "next-auth/middleware";

const publicRoutes = ["/login", "/register", "/"];

export async function middleware(request: NextRequest) {
    const token = await getToken({ req: request });
    const url = request.nextUrl;

    if (publicRoutes.includes(url.pathname)) {
        if (token) {
            return NextResponse.redirect(new URL("/feed", request.url));
        }
        return NextResponse.next();
    }

    if (!token) {
        return NextResponse.redirect(new URL("/login", request.url));
    }
    return NextResponse.next();
}

export const config = {
    matcher: ["/login", "/register", "/", "/feed/:path*"],
};
