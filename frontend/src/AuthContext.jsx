import React, {
    createContext,
    useContext,
    useEffect,
    useState
} from "react";

import { getUserPermissions, getUser } from "./API/apiClient";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [permissions, setPermissions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadUser = async () => {
            try {
                const token = localStorage.getItem("token");

                if (!token) {
                    setUser(null);
                    setPermissions([]);
                    return;
                }

                const userData = await getUser();

                setUser(userData);
                setPermissions(userData.permissions ?? []);
            } catch (error) {
                console.error(error);
                setUser(null);
                setPermissions([]);
            } finally {
                setLoading(false);
            }
        };

        loadUser();
    }, []);

    const refreshUser = async () => {

        const response = await getUser();
        const updatedUser = await response.json();
        setUser(updatedUser);
        return updatedUser;
    }

    const isAuthenticated = !!user;

    const hasPermission = (permission) => {
        return user?.permissions?.includes(permission) ?? false;
    };

    const login = async (token) => {
        if (!token) {
            return;
        }

        localStorage.setItem("token", token);

        try {
            const tokenParts = token.split(".");

            if (tokenParts.length !== 3) {
                throw new Error("Invalid JWT");
            }

            const payload = JSON.parse(
                atob(tokenParts[1])
            );

            const basicUser = {
                id: payload.id,
                username: payload.username,
                permissions: []
            };

            setUser(basicUser);

            const result = await getUserPermissions(
                payload.id
            );

            setUser({
                ...basicUser,
                permissions: result.permissions
            });

        } catch (error) {
            console.error(
                "Login failed:",
                error
            );

            localStorage.removeItem("token");
            setUser(null);
        }
    };

    const logout = () => {
        localStorage.removeItem("token");
        setUser(null);
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                loading,
                isAuthenticated,
                hasPermission,
                login,
                logout,
                permissions,
                refreshUser
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}