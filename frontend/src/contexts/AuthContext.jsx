import { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem('user');
        return savedUser ? JSON.parse(savedUser) : null;
    });
    const [role, setRole] = useState(() => {
        const savedUser = localStorage.getItem('user');
        return savedUser ? JSON.parse(savedUser).role : null;
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const initializeAuth = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    const userData = await fetchUserData(token);
                    setUser(userData);
                    setRole(userData.role);
                    localStorage.setItem('user', JSON.stringify(userData));
                } catch (error) {
                    console.error('Failed to fetch user data:', error);
                    if (
                        error.message === 'Session expired. Please login again.'
                    ) {
                        logout();
                        window.location.href = '/login';
                    }
                }
            }
            setLoading(false);
        };
        initializeAuth();
    }, []);

    const fetchUserData = async (token) => {
        try {
            const response = await fetch(
                'https://msms-cnweb.onrender.com/api/users/me',
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                }
            );

            if (response.status === 401) {
                throw new Error('Session expired. Please login again.');
            }

            if (!response.ok) {
                throw new Error('Failed to fetch user data');
            }

            return await response.json();
        } catch (error) {
            if (error.message === 'Session expired. Please login again.') {
                throw error;
            }
            throw new Error('Failed to fetch user data');
        }
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

    const isAuthenticated = () => {
        const token = localStorage.getItem('token');
        const savedUser = localStorage.getItem('user');
        if (!token || !savedUser) return false;

        try {
            // Check if token is expired
            const tokenData = JSON.parse(atob(token.split('.')[1]));
            const expirationTime = tokenData.exp * 1000; // Convert to milliseconds
            if (Date.now() >= expirationTime) {
                logout();
                return false;
            }
            return true;
        } catch (error) {
            console.error('Error checking token:', error);
            logout();
            return false;
        }
    };

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
