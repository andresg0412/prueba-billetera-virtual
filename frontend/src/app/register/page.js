'use client';
import RegisterTemplate from '@/components/templates/register/register.template';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import styles from './page.module.css';

export default function Login() {
    const [error, setError] = useState('');
    const router = useRouter();

    const handleSubmit = async (name, document, phone, email) => {
        try {
            const response = await axios.post('/api/register', {
                name,
                document,
                phone,
                email
            });
            if (response.data.success === true) {
                router.push('/login');
            }
        } catch (error) {
            setError(error.response.data.message);
        }
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
