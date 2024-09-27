import styles from './label.module.css';
function Label ({ children, ...props }) {
    return (
        <label
            className={styles.label}
            {...props}
        >
            {children}
        </label>
    );
}

export default Label;