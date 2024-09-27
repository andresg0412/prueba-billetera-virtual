'use client';
import LoginTemplate from '@/components/templates/login/login.template';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import styles from './page.module.css';

export default function Login() {
    const [error, setError] = useState('');
    const [isAlertModal, setIsAlertModal] = useState(false);
    const router = useRouter();

    const handleSubmit = async (document, phone) => {
        try {
            const response = await axios.post('/api/login', { document, phone });
            if (response.data.success === true) {
                router.push('/dashboard');
            } else {
                setIsAlertModal(true);
            }

        } catch (error) {
            if (error.response) {
                setError(error.response.data.message || 'Invalid username or password');
            } else {
                setError('An error occurred. Please try again.');
            }
        }
    };

    const handleGoToRegister = () => {
        router.push('/register');
    };


    return (
        <>
            <main className={styles.mainLogin}>
                <LoginTemplate
                    handleSubmit={handleSubmit}
                    handleGoToRegister={handleGoToRegister}
                    isAlertModal={isAlertModal}
                    setIsAlertModal={setIsAlertModal}
                    error={error}
                />
            </main>
        </>
    );
}
