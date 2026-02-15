import AuthForm from '../components/AuthForm';
import AnimationWrapper from '../common/AnimationWrapper';
import authService from '../services/auth';
import { useState, useContext } from 'react';
import { UserContext } from '../context/UserContextProvider';
import { Navigate } from 'react-router';

const LoginPage = () => { 
    const [errors, setErrors] = useState([]);
    const { user, setUser } = useContext(UserContext);

    const handleSubmit = async (event) => {
        event.preventDefault();        

        const userData = Object.fromEntries(new FormData(event.target));       

        try {
            await authService.authenticate(userData, setUser, 'login');

        } catch (error) {
            setErrors(error.cause);          
        };       
    };

    return (
        user
        ?
        <Navigate to='/'/>
        :
        <AnimationWrapper>
            <section className="flex-1 flex items-center justify-center">
                <AuthForm 
                    type="login"
                    handleSubmit={handleSubmit}
                    errors={errors} 
                />
            </section>
        </AnimationWrapper>               
    );
};

export default LoginPage;