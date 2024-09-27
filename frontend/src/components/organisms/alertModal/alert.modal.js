import React from 'react';
import Titulo3 from '@/components/atoms/text/titulo3.atoms';
import Button from '@/components/atoms/button/button.component';
import styles from './alert.modal.module.css';
function AlertModal({ setIsAlertModal, text }) {
    return (
        <>
            <div className={styles.container}>
                <Titulo3>{text}</Titulo3>
                <Button
                    className={styles.aceptar}
                    onClick={() => setIsAlertModal(false)}
                >
                    Aceptar
                </Button>
            </div>
        </>
    )
}

export default AlertModal;