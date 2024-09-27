import React, { useState } from 'react';
import Saldo from '@/components/molecules/saldo/saldo.molecule';
import Button from '@/components/atoms/button/button.component';
import DepositModal from '@/components/organisms/depositModal/deposit.modal';
import AlertModal from '@/components/organisms/alertModal/alert.modal';
import { useRouter } from 'next/navigation';
import DashboardOrganism from '@/components/organisms/dashboard/dashboard.organism';
import axios from 'axios';
import styles from './dashboard.template.module.css';
function DashboardTemplate({
    balance,
    handleRefreshBalance
}) {
    const [depositModal, setDepositModal] = useState(false);
    const [isAlertModal, setIsAlertModal] = useState(false);
    const router = useRouter();
    //FUNCION PARA CONTROLAR EL BOTON DE DEPOSITAR QUE ABRE EL MODAL
    const handleDepositModal = () => {
        setDepositModal(!depositModal);
    }
    const handleConfirmDeposit = async (amount) => {
        const response = await axios.post('/api/deposit', { amount });
        if (response.data.success === true) {
            handleRefreshBalance();
            setDepositModal(!depositModal);
            setIsAlertModal(!isAlertModal);
        }
    }

    const handleMarketplace = () => {
        router.push('/marketplace');
    }

    return (
        <>
            <div>
                <DashboardOrganism
                    balance={balance}
                    handleDepositModal={handleDepositModal}
                    handleMarketplace={handleMarketplace}
                />
            </div>
            {depositModal ? (
                <div className={styles.containerModal}>
                    <DepositModal
                        setDepositModal={setDepositModal}
                        handleConfirmDeposit={handleConfirmDeposit}
                    />
                </div>
            ) : null}

            {isAlertModal ? (
                <div className={styles.containerModal}>
                    <AlertModal
                        setIsAlertModal={setIsAlertModal}
                        text="Deposito exitoso"
                    />
                </div>
            ) : null}
        </>
    );
}
export default DashboardTemplate;