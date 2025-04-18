import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

const ProtectedRoute = ({ children }) => {
    const { customer } = useAuth();

    if (!customer) {
        return <Navigate to="/notfound" replace />;
    }

    return children;
};

export default ProtectedRoute;
