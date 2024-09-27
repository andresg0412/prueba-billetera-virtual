import React from 'react';
import DepositGroup from '@/components/molecules/depositGroup/deposit.group';
import styles from './deposit.modal.module.css';
function DepositModal({ setDepositModal, handleConfirmDeposit }) {
    return (
        <>
            <div className={styles.container}>
                <DepositGroup
                    setDepositModal={setDepositModal}
                    handleConfirmDeposit={handleConfirmDeposit}
                />
            </div>
        </>
    )
}

export default DepositModal;