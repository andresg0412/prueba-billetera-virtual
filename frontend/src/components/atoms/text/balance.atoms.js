import styles from './text.module.css';

function Balance({ children, ...props }) {
    return (
        <>
            <h3
                className={styles.balance}
                {...props}
            >
                {children}
            </h3>
        </>
    )
}

export default Balance;