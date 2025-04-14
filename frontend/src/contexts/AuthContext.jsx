import { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [customer, setCustomer] = useState(null);

    useEffect(() => {
        const storedCustomer = localStorage.getItem('customer');
        if (storedCustomer) {
            setCustomer(JSON.parse(storedCustomer));
        }
    }, []);

    const login = (customerData) => {
        localStorage.setItem('customer', JSON.stringify(customerData));
        setCustomer(customerData);
    };

    const logout = () => {
        localStorage.removeItem('customer');
        setCustomer(null);
    };

    return (
        <AuthContext.Provider value={{ customer, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
