import './styles/App.css';

import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import NavigationBar from './components/Structure/NavigationBar';
import Cart from './pages/Cart';
import Order from './pages/Order';
import Payment from './pages/Payment';
import { Toaster } from '@/components/ui/sonner';
import LogIn from './pages/LogIn';
import SignUp from './pages/SignUp';
import ProtectedRoute from './components/Structure/ProtectedRoute';

function App() {
    return (
        <>
            <NavigationBar />
            {/* <Banner /> */}
            <Routes>
                <Route path="/" element={<Home />} />
                <Route
                    path="/cart"
                    element={
                        <ProtectedRoute>
                            <Cart />
                        </ProtectedRoute>
                    }
                />
                <Route path="/order" element={<Order />} />
                <Route path="/payment" element={<Payment />} />
                <Route path="*" element={<NotFound />} />
                <Route path="/login" element={<LogIn />} />
                <Route path="/signup" element={<SignUp />} />
            </Routes>
            <Toaster />
            {/* <Footer /> */}
        </>
    );
}

export default App;
