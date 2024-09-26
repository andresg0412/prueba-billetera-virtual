import { signToken } from '@/utils/auth';
import { NextResponse } from 'next/server';
import { serialize } from 'cookie';

export async function POST(req) {

    const { document, phone } = await req.json();

    if (document === '123456' && phone === '3151234567') {
        const token = signToken({ document: document, phone: phone });

        const cookie = serialize('auth', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== 'development',
            maxAge: 3600,
            sameSite: 'strict',
            path: '/',
        });

        const response = NextResponse.json({ success: true });
        response.headers.set('Set-Cookie', cookie);
        return response;
    }

    return NextResponse.json({ success: false });

}