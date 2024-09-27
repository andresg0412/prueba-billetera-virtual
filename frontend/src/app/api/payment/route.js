import { NextResponse } from 'next/server';
import { parse } from 'cookie';
import axios from 'axios';
import { serialize } from 'cookie';
import { configDotenv } from 'dotenv';

export async function POST(req) {
    const { cost_to_pay } = await req.json();
    const cookies = parse(req.headers.get('cookie') || '');
    const document = cookies.document;
    const phone = cookies.phone;

    if (!document && !phone) {
        return NextResponse.json({ success: false, message: 'Document and phone are required' });
    }
    try {

        const responseAPI = await axios.post(`${process.env.BASE_URL_API}/api/payment`, {
            document,
            phone,
            cost_to_pay
        });
        const { success, data } = responseAPI.data;
        if (!success || !data) {
            return NextResponse.json({ success: false, message: 'Error en API' });
        }

        const sessionCookie = serialize('sessionId', data.sessionId, {
            httpOnly: false,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 60 * 60 * 24 * 7,
            path: '/',
        });

        const response = NextResponse.json({
            success: true,
            message: 'Transacción creada'
        });

        response.headers.set('Set-Cookie', sessionCookie);
        return response;

    } catch (error) {

        return NextResponse.json({ success: false, message: 'Error en API' });

    }

}