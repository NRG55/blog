import AuthForm from '../components/AuthForm';
import AnimationWrapper from '../components/AnimationWrapper';
import authService from '../services/auth';
import { useState, useContext } from 'react';
import { UserContext } from '../context/UserContextProvider';
import { Navigate } from 'react-router';

const SignupPage = () => {
    const [ errors, setErrors ] = useState([]);
    const { user, setUser } = useContext(UserContext);

    const handleSubmit = async (event) => {
        event.preventDefault();        

        const userData = Object.fromEntries(new FormData(event.target));       

        try {
            const result = await authService.authenticate(userData, setUser, 'signup');

        } catch (error) {
            setErrors(error.cause);          
        } ;       
    }; 

    return (
        user
        ?
        <Navigate to='/'/>
        :
        <AnimationWrapper>
            <section className="flex-1 flex items-center justify-center">
                <AuthForm 
                    type="signup"
                    handleSubmit={handleSubmit}
                    errors={errors} 
                />
            </section>
        </AnimationWrapper> 
    );
};

export default SignupPage;