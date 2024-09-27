'use client';
import React, { useState, useEffect } from 'react';
import Header from '@/components/organisms/header/header';
import MarketplaceTemplate from '@/components/templates/marketplace/marketplace.template';
import styles from './page.module.css';
import Cookies from 'js-cookie';
import axios from 'axios';
export default function Marketplace() {
    const [name, setName] = useState('');
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const nameCookie = Cookies.get('name');
        setName(nameCookie);
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
            <main className={styles.mainLogin}>
                <Header
                    name={name}
                />
                <MarketplaceTemplate
                    products={products}
                />
            </main>
        </>
    )
}