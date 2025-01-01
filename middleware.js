import { jwtVerify } from 'jose';
import { NextResponse } from 'next/server'

const secretKey = "6dce0f1746fee1d44fb3d75017abc75c81ac5a406cfb8640cbff3a61d7a197ce"
const key = new TextEncoder().encode(secretKey);

export async function middleware(request) {
    try {
        const response = NextResponse.redirect(new URL('/login', request.url));
        // const nextURL = request.nextUrl.href || "";
        // response.cookies.set('nextURL', nextURL, {
        //     httpOnly: true,
        //     secure: true,
        //     path: '/',
        // });

        const token = request?.cookies?.get("token")?.value;
        console.log("token =>", token)

        if (token) {
            const { payload } = await jwtVerify(token, key, {
                algorithms: ["HS256"],
            });
            console.log("payload =>", payload);
            if (payload) {
                const currentTimestamp = Math.floor(Date.now() / 1000);
                if (currentTimestamp > payload?.exp) {
                    return response;
                }
                return NextResponse.next();
            }
        }
        return response;
    } catch (error) {
        return response;
    }
}

export const config = {
    matcher: '/dashboard/:path*',
}