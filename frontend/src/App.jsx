import './styles/App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from '@/components/ui/sonner';
import { useAuth } from './contexts/AuthContext';

//- Customer pages
import Store from './pages/Customer/Store';
import Cart from './pages/Customer/Cart';
import Order from './pages/Customer/Order';

//- Auth pages
import LogIn from './pages/Auth/LogIn';
import SignUp from './pages/Auth/SignUp';

//- Seller pages
import Orders from './pages/Seller/Orders';
import Dashboard from './pages/Seller/Dashboard';

//- Admin pages
import ManageAccount from './pages/Admin/ManageAccount';

//- Shared components
import NotFound from './pages/NotFound';
import Payment from './pages/Customer/Payment';
import About from './pages/About';
import ProtectedRoute from './components/Structure/ProtectedRoute';
import SellerNavigationBar from './components/Structure/NavigationBar/SellerNavigationBar';
import CustomerNavigationBar from './components/Structure/NavigationBar/CustomerNavigationBar';
import AdminNavigationBar from './components/Structure/NavigationBar/AdminNavigationBar';
import GuestNavigationBar from './components/Structure/NavigationBar/GuestNavigationBar';

const App = () => {
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

    const renderPublicRoutes = () => (
        <>
            <Route path="/login" element={<LogIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/about" element={<About />} />
            <Route path="*" element={<NotFound />} />
        </>
    );

    const renderCustomerRoutes = () => (
        <>
            <Route path="/cart" element={<Cart />} />
            <Route path="/order" element={<Order />} />
            <Route path="/payment" element={<Payment />} />
        </>
    );

    const renderSellerRoutes = () => (
        <>
            <Route path="/orders" element={<Orders />} />
            <Route path="/dashboard" element={<Dashboard />} />
        </>
    );

    const renderAdminRoutes = () => (
        <Route path="/account" element={<ManageAccount />} />
    );

    return (
        <>
            {getNavigationBar()}

            <main className="pt-4 md:pt-4">
                <Routes>
                    <Route path="/" element={getHomeRoute()} />
                    {renderPublicRoutes()}
                    {renderCustomerRoutes()}
                    {isAuthenticated() &&
                        user?.role === 'seller' &&
                        renderSellerRoutes()}
                    {isAuthenticated() &&
                        user?.role === 'admin' &&
                        renderAdminRoutes()}
                </Routes>
            </main>

            <Toaster />
        </>
    );
};

export default App;
