import FormGroup from '@/components/molecules/form.group/form.group';
import Button from '@/components/atoms/button/button.component';
import Titulo1 from '@/components/atoms/text/titulo1.component';
import AlertModal from '../alertModal/alert.modal';
import { useState } from 'react';
import styles from './login.form.module.css';
function LoginForm({
    handleSubmit,
    handleGoToRegister,
    isAlertModal,
    setIsAlertModal,
    error
}) {

    const [document, setDocument] = useState('');
    const [phone, setPhone] = useState('');
    const handleClick = () => {
        handleSubmit(document, phone);
    }
    const handleButtonGoToRegister = () => {
        handleGoToRegister();
    }

    return (
        <>
            <div className={styles.containerLoginForm}>
                <Titulo1>Login</Titulo1>
                <FormGroup
                    id="document"
                    type="text"
                    placeholder="123456789"
                    label="Documento"
                    value={document}
                    onChange={(e) => setDocument(e.target.value)}
                />
                <FormGroup
                    id="phone"
                    type="text"
                    placeholder="3175215555"
                    label="Celular"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                />
                <Button onClick={handleClick}>Entrar</Button>
                {error && <p className="text-red-500">{error}</p>}
                <Button onClick={handleButtonGoToRegister} className={styles.buttonRegister}>Crear cuenta</Button>
            </div>
            {isAlertModal ? (
                <div className={styles.alertModal}>
                    <AlertModal
                        text="Credenciales incorrectas"
                        setIsAlertModal={setIsAlertModal}
                    />
                </div>
            ): null}

        </>
    )
}

export default LoginForm;