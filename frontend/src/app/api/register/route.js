import { NextResponse } from 'next/server';
import axios from 'axios';
import { configDotenv } from 'dotenv';

export async function POST(req) {
    const { name, document, phone, email } = await req.json();
    if (!document || !phone || !name || !email) {
        return NextResponse.json({ success: false, message: 'Todos los campos son requeridos' });
    }

    try {
        const response = await axios.post(`${process.env.BASE_URL_API}/api/customer`, {
            name,
            document,
            phone,
            email
        });
        const { success, data } = response.data;

        if (!success || !data) {
            return NextResponse.json({ success: false, message: 'Error en API' });
        }

        return NextResponse.json({
            success: true,
            message: 'Cliente creado'
        });
    }

    catch (error) {
        return NextResponse.json({ success: false, message: 'Error en API' });
    }
}