import React, { useState } from 'react';
import Titulo3 from '@/components/atoms/text/titulo3.atoms';
import ListProducts from '@/components/organisms/listProducts/list.products.organisms';
import Button from '@/components/atoms/button/button.component';
import PayModal from '@/components/organisms/payModal/pay.modal.organism';
import OtpModal from '@/components/organisms/otpModal/otp.modal';
import AlertModal from '@/components/organisms/alertModal/alert.modal';
import styles from './marketplace.module.css';
import { useRouter } from 'next/navigation';
function MarketplaceTemplate({ products }) {
    const router = useRouter();
    const [productSelected, setProductSelected] = useState(null);
    const [isPayModalVisible, setIsPayModalVisible] = useState(false);
    const [isOTPModalVisible, setIsOTPModalVisible] = useState(false);
    const [isAlertModal, setIsAlertModal] = useState(false);
    const [resultOp, setResultOp] = useState('ok');

    function handleSelectedProduct(product) {
        setProductSelected(product)
        setIsPayModalVisible(true);
    }
    function handleAceptPay() {
        setIsPayModalVisible(false);
        setIsOTPModalVisible(true);
    }
    function handleConfirmOtp() {
        setIsOTPModalVisible(false);
        setResultOp('Comprado con éxito');
        setIsAlertModal(true);
    }
    return (
        <>
            <div>
                <Titulo3>Marketplace</Titulo3>
            </div>
            <div>
                <ListProducts
                    products={products}
                    handleSelectedProduct={handleSelectedProduct}
                />
            </div>
            <div>
                <Button onClick={() => router.back()}>Volver</Button>
            </div>
            {isPayModalVisible ? (
                <div className={styles.containerModal}>
                    <PayModal
                        text="Comprar producto con valor de:"
                        price={productSelected?.price}
                        handleAceptPay={handleAceptPay}
                        setIsPayModalVisible={setIsPayModalVisible}
                    />
                </div>
            ) : null}

            {isOTPModalVisible ? (
                <div className={styles.containerModal}>
                    <OtpModal
                        handleConfirmOtp={handleConfirmOtp}
                        setIsOTPModalVisible={setIsOTPModalVisible}
                    />
                </div>
            ) : null}

            {isAlertModal ? (
                <div className={styles.containerModal}>
                    <AlertModal
                        text={resultOp}
                        setIsAlertModal={setIsAlertModal}
                    />
                </div>
            ) : null}
        </>
    )
}

export default MarketplaceTemplate;