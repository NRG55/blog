import App from './App';
import Layout from './layout/Layout';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import SearchPage from './pages/SearchPage';
import PostPage from './pages/PostPage';
import NotFoundPage from './pages/NotFoundPage';

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
                        path: 'posts/:slug',
                        element: <PostPage />
                    },
                    {
                        path: 'posts/search',
                        element: <SearchPage />
                    },
                    {
                        path: 'auth/signup',
                        element: <SignupPage />
                    },
                    {
                        path: 'auth/login',
                        element: <LoginPage />
                    },
                    { 
                        path: '*', 
                        element: <NotFoundPage /> 
                    }                    
                ]                
            }      
        ]
    }
];

export default routes;