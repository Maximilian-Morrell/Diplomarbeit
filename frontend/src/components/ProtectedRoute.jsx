const { user, permissions, loading } = useAuth();

if (loading) {
    return <div>Loading user...</div>;
}

if (!user) {
    return <Navigate to="/" replace />;
}

const allowed = requiredPermissions.every(permission =>
    permissions.includes(permission)
);

if (!allowed) {
    return <Navigate to="/" replace />;
}

return <Outlet />;