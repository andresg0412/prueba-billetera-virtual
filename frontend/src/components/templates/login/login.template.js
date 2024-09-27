import LoginForm from '@/components/organisms/loginForm/login.form';
function LoginTemplate({
    handleSubmit,
    handleGoToRegister,
    isAlertModal,
    setIsAlertModal,
    error
}) {
    return (
        <>
            <LoginForm
                handleSubmit={handleSubmit}
                handleGoToRegister={handleGoToRegister}
                isAlertModal={isAlertModal}
                setIsAlertModal={setIsAlertModal}
                error={error}
            />
        </>
    );
}
export default LoginTemplate;