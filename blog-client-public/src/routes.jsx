import App from './App';
import Layout from './layout/Layout';

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
                        element: <h1>Sign up page</h1> 
                    }
                ]                
            }      
        ]
    }
];

export default routes;