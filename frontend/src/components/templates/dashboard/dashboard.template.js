import React, { useState } from 'react';
import Saldo from '@/components/molecules/saldo/saldo.molecule';
import Button from '@/components/atoms/button/button.component';
import DepositModal from '@/components/organisms/depositModal/deposit.modal';
import AlertModal from '@/components/organisms/alertModal/alert.modal';
import { useRouter } from 'next/navigation';
import styles from './dashboard.template.module.css';
function DashboardTemplate({
    balance
}) {
    const [depositModal, setDepositModal] = useState(false);
    const [isAlertModal, setIsAlertModal] = useState(false);
    const router = useRouter();
    //FUNCION PARA CONTROLAR EL BOTON DE DEPOSITAR QUE ABRE EL MODAL
    const handleDepositModal = () => {
        setDepositModal(!depositModal);
    }
    const handleConfirmDeposit = () => {
        setDepositModal(!depositModal);
        setIsAlertModal(!isAlertModal);
    }

    const handleMarketplace = () => {
        router.push('/marketplace');
    }

    return (
        <>
            <div>
                <Saldo
                    balance={balance}
                />
                <Button>Transferir</Button>
                <Button
                    onClick={() => handleDepositModal()}
                >Depositar</Button>
                <Button>Retirar</Button>
                <Button
                    onClick={() => handleMarketplace()}>
                    Marketplace
                </Button>
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