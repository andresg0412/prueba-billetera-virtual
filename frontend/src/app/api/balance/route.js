import { NextResponse } from 'next/server';
import { parse } from 'cookie';
import axios from 'axios';
import { configDotenv } from 'dotenv';

export async function GET(req){

    const cookies = parse(req.headers.get('cookie') || '');
    const document = cookies.document;
    const phone = cookies.phone;

    if (!document && !phone) {
        return NextResponse.json({ success: false, message: 'Document and phone are required' });
    }

    try {

        const response = await axios.get(`${process.env.BASE_URL_API}/api/balance/${document}/${phone}`);
        const { success, data } = response.data;
        if (!success || !data) {
            return NextResponse.json({ success: false, message: 'Error en API' });
        }

        return NextResponse.json({
            success: true,
            balance: data.balance
        });

    } catch (error) {

        return NextResponse.json({ success: false, message: 'Error en API' });

    }

}