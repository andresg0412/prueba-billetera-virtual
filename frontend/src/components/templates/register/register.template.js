import RegisterForm from '@/components/organisms/registerForm/register.form';
function RegisterTemplate({
    handleSubmit,
    handleGoToLogin,
    error
}) {
    return (
        <>
            <RegisterForm
                handleSubmit={handleSubmit}
                handleGoToLogin={handleGoToLogin}
                error={error}
            />
        </>
    );
}
export default RegisterTemplate;