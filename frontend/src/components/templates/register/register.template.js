import RegisterForm from '@/components/organisms/registerForm/register.form';
import styles from './register.template.module.css';
function RegisterTemplate({
    handleSubmit,
    handleGoToLogin,
    error
}) {
    return (
        <>
            <div className={styles.container}>
                <RegisterForm
                    handleSubmit={handleSubmit}
                    handleGoToLogin={handleGoToLogin}
                    error={error}
                />
            </div>
        </>
    );
}

export default RegisterTemplate;