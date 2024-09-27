import React, { useState } from 'react';
import Titulo4 from '@/components/atoms/text/titulo4.atoms';
import styles from './otp.group.module.css';
import Button from '@/components/atoms/button/button.component';
import Input from '@/components/atoms/input/input.component';

function OtpGroup({ text, handleConfirmOtp, setIsPayModalVisible }) {
    const [valueOtp, setValueOtp] = useState('');
    return (
        <>
            <div className={styles.otpGroup}>
                <Titulo4>{text}</Titulo4>
                <Input
                    type="text"
                    placeholder="123456"
                    value={valueOtp}
                    onChange={(e) => setValueOtp(e.target.value)}
                />
                <Button
                    onClick={() => handleConfirmOtp(valueOtp)}>Confirmar</Button>
                <Button
                    className={styles.cancel}
                    onClick={() => setIsPayModalVisible(false)}>
                    Cancelar
                </Button>
                <Button
                    className={styles.close}
                    onClick={() => setIsPayModalVisible(false)}>
                    X
                </Button>
            </div>
        </>
    )
};

export default OtpGroup;