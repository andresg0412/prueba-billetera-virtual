import FormGroup from "@/components/molecules/form.group/form.group";
import Button from "@/components/atoms/button/button.component";
import Titulo1 from "@/components/atoms/text/titulo1.component";
import { useState } from "react";
import styles from "./header.module.css";
function Header() {
    return (
        <>
            <div className={styles.containerHeader}>
                <p>Bienvenido</p>
            </div>

        </>
    )
}

export default Header;