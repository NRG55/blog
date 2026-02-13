import AuthForm from '../components/AuthForm';

const SignupPage = () => { 

    return (
        <section className="flex-1 flex items-center justify-center">
            <AuthForm type="signup" />
        </section> 
    );
};

export default SignupPage;