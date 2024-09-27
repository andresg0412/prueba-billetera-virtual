import styles from './otp.modal.module.css';
import OtpGroup from '@/components/molecules/otpGroup/otp.group';

const OtpModal = ({ handleConfirmOtp, setIsOTPModalVisible }) => {
    return (
        <>
            <div className={styles.container}>
                <OtpGroup
                    text={'Ingresa el código de verificación enviado a tu correo electrónico.'}
                    handleConfirmOtp={handleConfirmOtp}
                    setIsOTPModalVisible={setIsOTPModalVisible}
                />
            </div>
        </>
    )
};

export default OtpModal;