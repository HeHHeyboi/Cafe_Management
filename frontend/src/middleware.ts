import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
    const cookie = request.cookies.get('id');
    const isLoggedIn = !!cookie?.value;

    const pathname = request.nextUrl.pathname;

    const publicPaths = ['/Login', '/_next', '/favicon.ico', '/api'];


    const isPublic = publicPaths.some((path) => pathname.startsWith(path));

    if (!isLoggedIn && !isPublic) {
        return NextResponse.redirect(new URL('/Login', request.url));
    }

    if (isLoggedIn && pathname == '/Login') {
        return NextResponse.redirect(new URL('/Admin/MenuOrder', request.url));
    }

    return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next|favicon.ico|api).*)'], // ⛔ ยกเว้น _next/, favicon.ico, api
};
