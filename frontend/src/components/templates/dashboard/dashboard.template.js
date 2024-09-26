import Saldo from "@/components/molecules/saldo/saldo.organism";
import Button from "@/components/atoms/button/button.component";
function DashboardTemplate() {
    return (
        <>
            <Saldo balance={1000} />
            <Button>Transferir</Button>
            <Button>Depositar</Button>
            <Button>Retirar</Button>
            <Button>Marketplace</Button>
        </>
    );
}
export default DashboardTemplate;