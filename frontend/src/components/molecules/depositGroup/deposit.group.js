import Button from '@/components/atoms/button/button.component';
import Titulo3 from '@/components/atoms/text/titulo1.component';
import Input from '@/components/atoms/input/input.component';
import styles from './deposit.module.css';
import { useState } from 'react';

function DepositGroup({ setDepositModal, handleConfirmDeposit }) {
    const [amount, setAmount] = useState(0);
    return (
        <>
            <div className={styles.depositGroup}>
                <Titulo3>Valor a depositar</Titulo3>
                <Input
                    type='number'
                    placeholder='0.00'
                    className={styles.input}
                    onChange={(e) => setAmount(e.target.value)}
                />
                <Button
                    onClick={() => handleConfirmDeposit(amount)}>Depositar</Button>
                <Button
                    className={styles.cancel}
                    onClick={() => setDepositModal(false)}>
                    Cancelar
                </Button>
                <Button
                    className={styles.close}
                    onClick={() => setDepositModal(false)}>
                    X
                </Button>
            </div>
        </>
    )
};

export default DepositGroup;