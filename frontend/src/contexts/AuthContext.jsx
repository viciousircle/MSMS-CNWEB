import { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [role, setRole] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        const storedRole = localStorage.getItem('role');

        if (storedUser && storedRole) {
            setUser(JSON.parse(storedUser));
            setRole(storedRole);
        }
    }, []);

    const login = (userData, userRole) => {
        localStorage.setItem('user', JSON.stringify(userData));
        localStorage.setItem('role', userRole);
        setUser(userData);
        setRole(userRole);
    };

    const logout = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('role');
        setUser(null);
        setRole(null);
    };

    const isAuthenticated = () => !!user;
    const isCustomer = () => role === 'customer';
    const isSeller = () => role === 'seller';

    return (
        <AuthContext.Provider
            value={{
                user,
                role,
                login,
                logout,
                isAuthenticated,
                isCustomer,
                isSeller,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
