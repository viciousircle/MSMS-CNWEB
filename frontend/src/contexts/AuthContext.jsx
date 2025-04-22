import { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [role, setRole] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const initializeAuth = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    const userData = await fetchUserData(token);
                    setUser(userData);
                    setRole(userData.role); //* API returns a role field
                } catch (error) {
                    console.error('Failed to fetch user data:', error);
                    logout();
                }
            }
            setLoading(false);
        };
        initializeAuth();
    }, []);

    const fetchUserData = async (token) => {
        const response = await fetch('http://localhost:5678/api/users/me', {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
        if (!response.ok) {
            throw new Error('Failed to fetch user data');
        }
        return await response.json();
    };

    const login = async (token) => {
        localStorage.setItem('token', token);
        try {
            const userData = await fetchUserData(token);
            setUser(userData);
            setRole(userData.role);
            localStorage.setItem('user', JSON.stringify(userData));
        } catch (error) {
            console.error('Login failed:', error);
            logout();
            throw error;
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
        setRole(null);
    };

    const isAuthenticated = () => !!user;
    const isCustomer = () => role === 'customer';
    const isSeller = () => role === 'seller';
    const isAdmin = () => role === 'admin';

    return (
        <AuthContext.Provider
            value={{
                user,
                role,
                loading,
                login,
                logout,
                isAuthenticated,
                isCustomer,
                isSeller,
                isAdmin,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
