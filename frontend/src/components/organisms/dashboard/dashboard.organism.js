import styles from './dashboard.organism.module.css';
import MenuOpciones from '@/components/molecules/menuOpciones/menu.opciones.molecule';
import Saldo from '@/components/molecules/saldo/saldo.molecule';
function DashboardOrganism({ balance, handleMarketplace, handleDepositModal }) {
    return (
        <>
            <div className={styles.container}>
                <Saldo
                    balance={balance}
                />
                <MenuOpciones
                    handleMarketplace={handleMarketplace}
                    handleDepositModal={handleDepositModal}
                />
            </div>
        </>
    )
};

export default DashboardOrganism;