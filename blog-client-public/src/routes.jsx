import App from './App';
import Layout from './layout/Layout';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';

const routes = [
    {
        path: '/',
        element: <App />,        
        children: [
            {
                element: <Layout />,
                children: [
                    { 
                        index: true,
                        element: <HomePage /> 
                    },
                    {
                        path: 'auth/signup',
                        element: <SignupPage />
                    },
                    {
                        path: 'auth/login',
                        element: <LoginPage />
                    },
                ]                
            }      
        ]
    }
];

export default routes;