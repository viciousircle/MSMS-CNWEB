import "./styles/App.css";

import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import Banner from "./components/Banner";
import NavigationBar from "./components/NavigationBar";
import Footer from "./components/Footer";
import Cart from "./pages/Cart";
import Order from "./pages/Order";
import Payment from "./pages/Payment";
import { Toaster } from "@/components/ui/sonner";

function App() {
    return (
        <>
            <NavigationBar />
            {/* <Banner /> */}
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/order" element={<Order />} />
                <Route path="/payment" element={<Payment />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
            <Toaster />
            {/* <Footer /> */}
        </>
    );
}

export default App;
