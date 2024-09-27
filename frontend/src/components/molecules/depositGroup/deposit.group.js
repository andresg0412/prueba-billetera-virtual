import Button from '@/components/atoms/button/button.component';
import Titulo3 from '@/components/atoms/text/titulo1.component';
import Input from '@/components/atoms/input/input.component';
import styles from './deposit.module.css';

function DepositGroup({ setDepositModal, handleConfirmDeposit }) {

    return (
        <>
            <div className={styles.depositGroup}>
                <Titulo3>Valor a depositar</Titulo3>
                <Input
                    type='number'
                    placeholder='0.00'
                    className={styles.input}
                />
                <Button
                    onClick={() => handleConfirmDeposit()}>Depositar</Button>
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