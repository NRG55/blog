import { Navigate, Outlet } from 'react-router';

const ProtectedRoute = () => {
        
    //TODO: auth logic
    const isAuthenticated = true;

    return isAuthenticated ? <Outlet /> : <Navigate to="/auth/login" replace />;
};

export default ProtectedRoute;