import Titulo4 from '@/components/atoms/text/titulo4.atoms';
import Price from '@/components/atoms/text/price.atoms';
import styles from './par.modal.group.module.css';
import Button from '@/components/atoms/button/button.component';
function PayGroup({ text, price, handleAceptPay, setIsPayModalVisible }) {

    return (
        <>
            <div className={styles.depositGroup}>
                <Titulo4>{text}</Titulo4>
                <Price>${price}</Price>
                <Button
                    onClick={() => handleAceptPay()}>Aceptar</Button>
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

export default PayGroup;