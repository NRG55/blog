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

    const handleSubmit = async (event) => {
        event.preventDefault();        

        const userData = Object.fromEntries(new FormData(event.target));       

        try {
            const result = await authApiService.authenticate(userData, setUser, 'signup');

            login(result.user, result.token);                
            
            const origin = location.state?.from?.pathname || "/";

            navigate(origin, { replace: true });

        } catch (error) {
            setErrors(error.cause);          
        } ;       
    }; 

    return (
        <AnimationWrapper>
            <section className="grow flex items-center justify-center">
                <AuthForm 
                    type="signup"
                    handleSubmit={handleSubmit}
                    errors={ errors } 
                />
            </section>
        </AnimationWrapper> 
    );
};

export default SignupPage;