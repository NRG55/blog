import AuthForm from '../components/AuthForm';

const LoginPage = () => { 

    return (
        <section className="flex-1 flex items-center justify-center">
            <AuthForm type="login" />
        </section>        
    );
};

export default LoginPage;