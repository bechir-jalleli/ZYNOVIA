import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || 'd1e3e6f070999d7aa63edd9c8cd9bf83ce20beed');

export async function middleware(request: NextRequest) {
    const token = request.cookies.get('token')?.value;
    const { pathname } = request.nextUrl;

    // Protect /admin routes
    if (pathname.startsWith('/admin')) {
        if (!token) {
            return NextResponse.redirect(new URL('/auth/login', request.url));
        }

        try {
            const { payload }: any = await jwtVerify(token, JWT_SECRET);
            if (payload.role !== 'admin') {
                return NextResponse.redirect(new URL('/', request.url));
            }
            return NextResponse.next();
        } catch (error) {
            return NextResponse.redirect(new URL('/auth/login', request.url));
        }
    }

    // Redirect if logged in and trying to access /auth/login
    if (pathname === '/auth/login' && token) {
        try {
            await jwtVerify(token, JWT_SECRET);
            return NextResponse.redirect(new URL('/', request.url));
        } catch (error) {
            // Token invalid, allow login page
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/admin/:path*',
        '/auth/login'
    ],
};
