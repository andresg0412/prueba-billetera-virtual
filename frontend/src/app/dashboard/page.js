'use client';
import React, { useEffect } from 'react';
import LoginTemplate from '@/components/templates/login/login.template';
import { useState } from 'react';
import Header from '@/components/organisms/header/header';
import DashboardTemplate from '@/components/templates/dashboard/dashboard.template';
import styles from './page.module.css';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import axios from 'axios';

export default function Dashboard() {
    const [name, setName] = useState('Andres');
    const [balance, setBalance] = useState(1000);

    const document = Cookies.get('document');
    const phone = Cookies.get('phone');

    //OBTENER NOMBRE DEL CLIENTE

    //OBTENER BALANCE DEL CLIENTE
    useEffect(() => {
        const getBalance = async () => {
            const response = await axios.get(`/api/balance`);
            setBalance(response.data.balance);
        }
        getBalance();
    }, []);

    const handleRefreshBalance = async () => {
        const response = await axios.get(`/api/balance`);
        setBalance(response.data.balance);
    }


    return (
        <>
            <main className={styles.mainLogin}>
                <Header
                    name={name}
                />

                <DashboardTemplate
                    balance={balance}
                    handleRefreshBalance={handleRefreshBalance}
                />
            </main>
        </>
    )
}