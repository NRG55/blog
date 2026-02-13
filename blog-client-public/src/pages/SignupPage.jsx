import AuthForm from '../components/AuthForm';
import PageAnimationWrapper from '../common/pageAnimation';

const SignupPage = () => { 

    return (
        <PageAnimationWrapper>
            <section className="flex-1 flex items-center justify-center">
                <AuthForm type="signup" />
            </section>
        </PageAnimationWrapper> 
    );
};

export default SignupPage;