import styles from './text.module.css';

function Titulo3 ({ children, ...props }) {
    return (
        <h3
            className={styles.titulo3}
            {...props}
        >
            {children}
        </h3>
    )
}

export default Titulo3;