import React, {
    createContext,
    useContext,
    useEffect,
    useState
} from "react";

import { getUserPermissions } from "./API/apiClient";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) {
            setUser(null);
            setLoading(false);
            return;
        }

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

            getUserPermissions()
                .then((result) => {
                    setUser((currentUser) => {
                        if (!currentUser) {
                            return null;
                        }

                        return {
                            ...currentUser,
                            permissions: result.permissions
                        };
                    });
                })
                .catch((error) => {
                    console.error(
                        "Failed to load permissions:",
                        error
                    );
                })
                .finally(() => {
                    setLoading(false);
                });

        } catch (error) {
            console.error(
                "Invalid JWT:",
                error
            );

            localStorage.removeItem("token");
            setUser(null);
            setLoading(false);
        }
    }, []);

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
                logout
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}