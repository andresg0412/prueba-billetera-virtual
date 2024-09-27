import PayGroup from '@/components/molecules/payModalGroup/pay.modal.group';
import styles from './pay.modal.module.css';
function PayModal({ text, price, handleAceptPay, setIsPayModalVisible }) {
    return (
        <>
            <div className={styles.container}>
                <PayGroup
                    text={text}
                    price={price}
                    handleAceptPay={handleAceptPay}
                    setIsPayModalVisible={setIsPayModalVisible}
                />
            </div>
        </>
    )
};

export default PayModal;