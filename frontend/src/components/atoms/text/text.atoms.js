import styles from './text.module.css';

function Text ({ children, ...props }) {
    return (
        <p
            className={styles.text}
            {...props}
        >
            {children}
        </p>
    )
}

export default Text;