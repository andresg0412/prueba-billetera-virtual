import LoginForm from "@/components/organisms/loginForm/login.form";
function LoginTemplate({
    handleSubmit,
    handleGoToRegister,
    error
}) {
    return (
        <>
            <LoginForm
                handleSubmit={handleSubmit}
                handleGoToRegister={handleGoToRegister}
                error={error}
            />
        </>
    );
}
export default LoginTemplate;