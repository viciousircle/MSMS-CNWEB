import './styles/App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from '@/components/ui/sonner';
import Store from './pages/Customer/Store';
import NotFound from './pages/NotFound';
import Cart from './pages/Customer/Cart';
import Order from './pages/Customer/Order';
import Payment from './pages/Payment';
import LogIn from './pages/Auth/LogIn';
import SignUp from './pages/Auth/SignUp';
import ProtectedRoute from './components/Structure/ProtectedRoute';
import Orders from './pages/Seller/Orders';
import { useAuth } from './contexts/AuthContext';
import SellerNavigationBar from './components/Structure/NavigationBar/SellerNavigationBar';
import CustomerNavigationBar from './components/Structure/NavigationBar/CustomerNavigationBar';
import AdminNavigationBar from './components/Structure/NavigationBar/AdminNavigationBar';
import Dashboard from './pages/Seller/Dashboard';
import ManageAccount from './pages/Admin/ManageAccount';
import GuestNavigationBar from './components/Structure/NavigationBar/GuestNavigationBar';

function App() {
    const { user, isAuthenticated } = useAuth();

    const getNavigationBar = () => {
        if (!isAuthenticated()) return <GuestNavigationBar />;
        switch (user?.role) {
            case 'seller':
                return <SellerNavigationBar />;
            case 'admin':
                return <AdminNavigationBar />;
            default:
                return <CustomerNavigationBar />;
        }
    };

    const getHomeRoute = () => {
        if (!isAuthenticated()) return <Store />;
        switch (user?.role) {
            case 'seller':
                return <Navigate to="/orders" replace />;
            case 'admin':
                return <Navigate to="/account" replace />;
            default:
                return <Store />;
        }
    };

    return (
        <>
            {getNavigationBar()}

            <Routes>
                <Route path="/" element={getHomeRoute()} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/order" element={<Order />} />
                <Route path="/payment" element={<Payment />} />
                <Route path="*" element={<NotFound />} />
                <Route path="/login" element={<LogIn />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/orders" element={<Orders />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/account" element={<ManageAccount />} />
            </Routes>
            <Toaster />
        </>
    );
}

export default App;
