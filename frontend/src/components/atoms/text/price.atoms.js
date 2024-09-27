import styles from './text.module.css';

function Price ({ children, ...props }) {
    return (
        <p
            className={styles.price}
            {...props}
        >
            {children}
        </p>
    )
}

export default Price;