import AuthForm from '../components/AuthForm';
import AnimationWrapper from '../components/AnimationWrapper';
import authApiService from '../api/auth';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useLocation, useNavigate } from 'react-router';

const SignupPage = () => {
    const [ errors, setErrors ] = useState([]);
    const { login } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const handleSignup = async (event) => {
        event.preventDefault();        

        const userData = Object.fromEntries(new FormData(event.target));       

        try {
            const result = await authApiService.authenticate(userData, 'signup');

            login(result.user, result.token);                
            
            const origin = location.state?.from?.pathname || "/";

            navigate(origin, { replace: true });

        } catch (error) {
            const errorList = Array.isArray(error.cause)
                                ? error.cause
                                : [{ msg: error.message }];

            setErrors(errorList);                    
        };       
    }; 

    return (
        <AnimationWrapper>
            <section className="grow flex items-center justify-center">
                <AuthForm 
                    type="signup"
                    onSubmit={handleSignup}
                    errors={ errors } 
                />
            </section>
        </AnimationWrapper> 
    );
};

export default SignupPage;