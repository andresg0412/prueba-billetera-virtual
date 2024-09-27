import Button from '@/components/atoms/button/button.component';
import styles from './menu.opciones.module.css';
function MenuOpciones({ handleDepositModal, handleMarketplace }) {

    return (
        <>
            <div className={styles.buttonGrid}>
                <Button className={styles.gridButton}>
                    Transferir
                </Button>
                <Button
                    className={styles.gridButton}
                    onClick={() => handleDepositModal()}>
                    Depositar
                </Button>
                <Button className={styles.gridButton}>
                    Retirar
                </Button>
                <Button
                    className={styles.gridButton}
                    onClick={() => handleMarketplace()}>
                    Marketplace
                </Button>
            </div>
        </>
    )
};

export default MenuOpciones;