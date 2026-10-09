import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../AuthContext";

function ProtectedRoute({ requiredPermissions = [] }) {
    const { isAuthenticated, permissions, loading } = useAuth();
    const location = useLocation();

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!isAuthenticated) {
        return (
            <Navigate
                to="/"
                state={{ from: location }}
                replace
            />
        );
    }

    if (requiredPermissions.length > 0) {
        const hasPermission = requiredPermissions.some(
            permission => permissions.includes(permission)
        );

        if (!hasPermission) {
            return <Navigate to="/" replace />;
        }
    }

    return <Outlet />;
}

export default ProtectedRoute;