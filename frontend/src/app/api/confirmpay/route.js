import { NextResponse } from 'next/server';
import { parse } from 'cookie';
import axios from 'axios';
import { configDotenv } from 'dotenv';

export async function POST(req) {
    const { token } = await req.json();
    const cookies = parse(req.headers.get('cookie') || '');
    const document = cookies.document;
    const phone = cookies.phone;
    const sessionId = cookies.sessionId;

    if (!document && !phone) {
        return NextResponse.json({ success: false, message: 'Document and phone are required' });
    }

    try {

        const response = await axios.post(`${process.env.BASE_URL_API}/api/confirmPayment`, {
            document,
            phone,
            token,
            sessionId
        });
        const { success, data } = response.data;
        if (!success || !data) {
            return NextResponse.json({ success: false, message: 'Error en API' });
        }

        return NextResponse.json({
            success: true,
            message: 'Pago confirmado'
        });

    } catch (error) {

        return NextResponse.json({ success: false, message: 'Error en API' });

    }

}