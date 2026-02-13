import AuthForm from '../components/AuthForm';
import PageAnimationWrapper from '../common/pageAnimation';

const LoginPage = () => { 

    return (
        <PageAnimationWrapper>
            <section className="flex-1 flex items-center justify-center">
                <AuthForm type="login" />
            </section>
        </PageAnimationWrapper>               
    );
};

export default LoginPage;