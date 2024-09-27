import { NextResponse } from 'next/server';

export async function GET(req) {

    const products = [
        {
            id: 1,
            name: 'Product 1',
            description: 'Description 1',
            price: 100
        },
        {
            id: 2,
            name: 'Product 2',
            description: 'Description 2',
            price: 200
        },
        {
            id: 3,
            name: 'Product 3',
            description: 'Description 3',
            price: 300
        },
    ];

    return NextResponse.json({ products });

}