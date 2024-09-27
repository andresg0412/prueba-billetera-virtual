import FormGroup from '@/components/molecules/form.group/form.group';
import Button from '@/components/atoms/button/button.component';
import Titulo4 from '@/components/atoms/text/titulo4.atoms';
import { useState } from 'react';
import styles from './header.module.css';
function Header({ name }) {
    return (
        <>
            <div className={styles.containerHeader}>
                <Titulo4 className={styles.titulo4}>Bienvenido {name}</Titulo4>
            </div>

        </>
    )
}

export default Header;