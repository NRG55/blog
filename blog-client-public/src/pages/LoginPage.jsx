import AuthForm from '../components/AuthForm';
import AnimationWrapper from '../components/AnimationWrapper';
import authApiService from '../api/auth';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { useAuth } from '../context/AuthContext';

const LoginPage = () => { 
    const [ errors, setErrors ] = useState([]);
    const { login } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogin = async (event) => {
        event.preventDefault();        

        const userData = Object.fromEntries(new FormData(event.target));       

        try {
            const result = await authApiService.authenticate(userData, 'login');

            login(result.user, result.token);                
            
            const origin = location.state?.from?.pathname || "/";

            navigate(origin, { replace: true });

        } catch (error) {
            setErrors(error.cause || [{ msg: error.message }]);          
        };       
    };

    return (
        <AnimationWrapper>
            <section className="grow flex items-center justify-center">
                <AuthForm 
                    type="login"
                    onSubmit={handleLogin}
                    errors={ errors } 
                />
            </section>
        </AnimationWrapper>               
    );
};

export default LoginPage;