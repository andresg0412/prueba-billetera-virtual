import FormGroup from '@/components/molecules/form.group/form.group';
import Button from '@/components/atoms/button/button.component';
import Titulo1 from '@/components/atoms/text/titulo1.component';
import { useState } from 'react';
import styles from './register.form.module.css';
function RegisterForm({
    handleSubmit,
    handleGoToLogin,
    error
}) {

    const [name, setName] = useState('');
    const [document, setDocument] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const handleClick = () => {
        //handleSubmit(name, document, phone, email);
    }
    const handleButtonGoToLogin = () => {
        handleGoToLogin();
    }

    return (
        <>
            <div className={styles.containerLoginForm}>
                <Titulo1>Crear Cuenta</Titulo1>
                <FormGroup
                    id="name"
                    type="text"
                    placeholder="Nombre Completo"
                    label="Nombre"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <FormGroup
                    id="document"
                    type="text"
                    placeholder="Número de documento"
                    label="Documento"
                    value={document}
                    onChange={(e) => setDocument(e.target.value)}
                />
                <FormGroup
                    id="phone"
                    type="text"
                    placeholder="Telefono"
                    label="Telefono"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                />
                <FormGroup
                    id="email"
                    type="text"
                    placeholder="Correo Electronico"
                    label="Correo Electronico"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <Button onClick={handleClick}>Crear cuenta</Button>
                {error && <p className="text-red-500">{error}</p>}
                <Button onClick={handleButtonGoToLogin}>Ingresar</Button>
            </div>

        </>
    )
}

export default RegisterForm;