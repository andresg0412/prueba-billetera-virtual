import React from 'react';
import Titulo3 from '@/components/atoms/text/titulo3.atoms';
import Balance from '@/components/atoms/text/balance.atoms';
import styles from './saldo.module.css';
function Saldo({ balance }) {
    return (
        <>
            <div className={styles.container}>
                <Titulo3>SALDO</Titulo3>
                <Balance>{balance}</Balance>
            </div>
        </>
    )
}

export default Saldo;