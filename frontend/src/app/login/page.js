'use client';
import LoginTemplate from "@/components/templates/login/login.template";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from 'axios';
import styles from "./page.module.css";

export default function Login() {
    const [error, setError] = useState('');
    const router = useRouter();

    const handleSubmit = async (document, phone) => {
        try {
            const response = await axios.post('/api/login', { document, phone });
            console.log(response);
            if (response.status === 200) {
                router.push('/dashboard');
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
                    error={error}
                />
            </main>
        </>
    );
}
