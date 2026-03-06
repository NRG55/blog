import App from './App';
import Layout from './layout/Layout';
import { Navigate } from 'react-router';
import ProtectedRoute from './components/ProtectedRoot';
import Posts from './pages/Posts';
import NewPost from './pages/NewPost';
import LoginPage from './pages/LoginPage';
import EditPost from './pages/EditPost';
import Comments from './pages/Comments';
import CommentDetails from './pages/CommentDetails';
import SearchPage from './pages/SearchPage';

const routes = [
    {
        path: '/',
        element: <App />,        
        children: [
            {
                element: <Layout />,
                children: [
                    { index: true, element: <Navigate to="/auth/login" replace /> },                    
                    { path: 'auth/login', element: <LoginPage /> },                    

                    {
                        element: <ProtectedRoute />,
                        children: [
                            {
                                path: 'posts',
                                children: [
                                    { index: true, element: <Posts /> },
                                    { path: 'search', element: <SearchPage /> },
                                    { path: 'create', element: <NewPost /> },
                                    { 
                                        path: ':postId',
                                        children: [
                                            { path: 'edit', element: <EditPost /> }                                             
                                        ]
                                    },
                                ]
                            },

                            {
                                path: 'comments',
                                children: [                                    
                                    { path: ':postId?', element: <Comments /> },                                  
                                    { path: 'details/:commentId', element: <CommentDetails /> }
                                ]
                            }
                        ]
                    }
                ]                
            }      
        ]
    }
];

export default routes;