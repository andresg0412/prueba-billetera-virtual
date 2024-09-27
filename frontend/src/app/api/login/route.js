import { signToken } from '@/utils/auth';
import { NextResponse } from 'next/server';
import { serialize } from 'cookie';
import axios from 'axios';
import { configDotenv } from 'dotenv';

configDotenv();

export async function POST(req) {
    const { document, phone } = await req.json();
    if (!document || !phone) {
        return NextResponse.json({ success: false, message: 'Document and phone are required' });
    }

    try {
        const response = await axios.get(`${process.env.BASE_URL_API}/api/customers`);
        const { success, data } = response.data;

        if (!success || !data) {
            return NextResponse.json({ success: false, message: 'Error en API' });
        }

        const customer = data.find((item) => item.document === document && item.phone === phone);

        if (customer) {
            const documentCookie = serialize('document', document, {
                httpOnly: false,
                secure: process.env.NODE_ENV === 'production',
                maxAge: 60 * 60 * 24 * 7,
                path: '/',
            });
            const phoneCookie = serialize('phone', phone, {
                httpOnly: false,
                secure: process.env.NODE_ENV === 'production',
                maxAge: 60 * 60 * 24 * 7,
                path: '/',
            });
            const nameCookie = serialize('name', customer.name, {
                httpOnly: false,
                secure: process.env.NODE_ENV === 'production',
                maxAge: 60 * 60 * 24 * 7,
                path: '/',
            });
            const response = NextResponse.json({
                success: true,
                message: 'Login successful',
                customer,
            });
            response.headers.append('Set-Cookie', documentCookie);
            response.headers.append('Set-Cookie', phoneCookie);
            response.headers.append('Set-Cookie', nameCookie);
            return response;
        } else {
            return NextResponse.json({ success: false, message: 'Customer not found' });
        }
    }

    catch (error) {
        return NextResponse.json({ success: false, message: error });
    }
}