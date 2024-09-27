import LoginForm from '@/components/organisms/loginForm/login.form';
import styles from './login.template.module.css';
function LoginTemplate({
    handleSubmit,
    handleGoToRegister,
    isAlertModal,
    setIsAlertModal,
    error
}) {
    return (
        <>
            <div className={styles.container}>
                <LoginForm
                    handleSubmit={handleSubmit}
                    handleGoToRegister={handleGoToRegister}
                    isAlertModal={isAlertModal}
                    setIsAlertModal={setIsAlertModal}
                    error={error}
                />
            </div>
        </>
    );
}
export default LoginTemplate;