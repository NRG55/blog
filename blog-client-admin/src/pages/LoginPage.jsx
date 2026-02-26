import AuthForm from '../components/AuthForm';
import { useAuth } from '../context/AuthContext';
import { useNavigate, useLocation } from "react-router";

import { useState } from 'react';
import authService from '../api/auth';

const LoginPage = () => {
    const [ errors, setErrors ] = useState([]);
    const { login } = useAuth();    
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogin = async (event) => {
        event.preventDefault();

        setErrors([]);

        const formData = new FormData(event.target);
        const userData = Object.fromEntries(formData.entries());

        try {
            const result = await authService.login(userData)

            login(result.user, result.token);                
            
            const origin = location.state?.from?.pathname || "/posts";

            navigate(origin, { replace: true });
          
        } catch (error) {
            setErrors(error.cause);
        };
    };

    return (
        <section className="grow flex items-center -mt-60 justify-center">
            <AuthForm 
                onSubmit={ handleLogin }
                errors={ errors } 
            />
        </section>               
    );
};

export default LoginPage;