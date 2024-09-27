import styles from './button.module.css';
function Button ({ children, ...props }) {
    return (
        <button
            className={styles.button + " " + props.className}
            {...props}
        >
            {children}
        </button>
    )
}

export default Button;