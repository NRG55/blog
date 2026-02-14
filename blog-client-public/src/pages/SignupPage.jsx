import AuthForm from '../components/AuthForm';
import PageAnimationWrapper from '../common/PageAnimation';
import authService from '../services/auth';
import { useState } from 'react';

const SignupPage = () => {
    const [errors, setErrors] = useState([]);

    const handleSubmit = async (event) => {
        event.preventDefault();        

        const userData = Object.fromEntries(new FormData(event.target));       

        try {
            const result = await authService.authenticate(userData, 'signup');

        } catch (error) {
            setErrors(error.cause);          
        } ;       
    }; 

    return (
        <PageAnimationWrapper>
            <section className="flex-1 flex items-center justify-center">
                <AuthForm 
                    type="signup"
                    handleSubmit={handleSubmit}
                    errors={errors} 
                />
            </section>
        </PageAnimationWrapper> 
    );
};

export default SignupPage;