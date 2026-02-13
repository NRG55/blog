import App from './App';
import Layout from './layout/Layout';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';

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
                        element: <h1>Homepage</h1> 
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