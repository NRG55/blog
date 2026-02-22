import App from './App';
import Layout from './layout/Layout';
import { Navigate } from 'react-router';
import ProtectedRoute from './components/ProtectedRoot';
import PostList from './components/PostList';

const routes = [
    {
        path: '/',
        element: <App />,        
        children: [
            {
                element: <Layout />,
                children: [
                    { index: true, element: <Navigate to="/auth/login" replace /> },                    
                    { path: 'auth/login', element: <h1>Login</h1> },                    

                    {
                        element: <ProtectedRoute />,
                        children: [
                            {
                                path: 'posts',
                                children: [
                                    { index: true, element: <PostList /> },
                                    { path: 'create', element: <h1>Create post</h1> },
                                    { 
                                        path: ':id',
                                        children: [
                                            { path: 'edit', element: <h1>Edit post</h1> },
                                            { path: 'comments', element: <h1>Comments for the post</h1> } 
                                        ]
                                    },
                                ]
                            },

                            {
                                path: 'comments',
                                children: [
                                    { index: true, element: <h1>All Comments</h1> },
                                    { path: ':id', element: <h1>Comment Details</h1> }
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