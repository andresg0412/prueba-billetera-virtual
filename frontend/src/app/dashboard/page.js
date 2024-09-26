'use client';
import LoginTemplate from "@/components/templates/login/login.template";
import { useState } from "react";
import Header from "@/components/organisms/header/header";
import DashboardTemplate from "@/components/templates/dashboard/dashboard.template";
import { useRouter } from "next/navigation";
import axios from 'axios';

export default function Dashboard() {
    const [name, setName] = useState('');
    const [balance, setBalance] = useState(0);
    return (
        <>
            <Header />
            <DashboardTemplate />
        </>
    )
}