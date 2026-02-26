import { Navigate, Outlet, useLocation } from 'react-router';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = () => {    
    const { user, token, loading } = useAuth();
    const location = useLocation();

    if (loading) {
        return <p>Loading...</p>;
    };

    if (!token || user?.role !== 'ADMIN') {
        return <Navigate to="/auth/login" state={{ from: location }} replace />;
    };

    return <Outlet />;
};

export default ProtectedRoute;