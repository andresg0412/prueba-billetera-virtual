'use client';
import RegisterTemplate from '@/components/templates/register/register.template';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import styles from './page.module.css';

export default function Login() {
    const [error, setError] = useState('');
    const router = useRouter();

    const handleSubmit = async () => {
        console.log('ok')
    };

    const handleGoToLogin = () => {
        router.push('/login');
    };


    return (
        <>
            <main className={styles.mainLogin}>
                <RegisterTemplate
                    handleSubmit={handleSubmit}
                    handleGoToLogin={handleGoToLogin}
                    error={error}
                />
            </main>
        </>
    );
}
