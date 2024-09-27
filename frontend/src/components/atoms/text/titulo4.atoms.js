import styles from './text.module.css';

function Titulo4 ({ children, ...props }) {
    return (
        <h4
            className={styles.titulo4}
            {...props}
        >
            {children}
        </h4>
    )
}

export default Titulo4;