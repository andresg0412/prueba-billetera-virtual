'use client';
import React, { useState, useEffect } from 'react';
import Header from '@/components/organisms/header/header';
import MarketplaceTemplate from '@/components/templates/marketplace/marketplace.template';
import axios from 'axios';
export default function Marketplace() {
    const [name, setName] = useState('Andres');
    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios.get('/api/products')
            .then((response) => {
                setProducts(response.data.products);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);
    return (
        <>
            <Header
                name={name}
            />
            <MarketplaceTemplate
                products={products}
            />
        </>
    )
}