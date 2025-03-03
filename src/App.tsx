import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import OrderPage from "./pages/OrderPage.tsx";
import ReceiptPage from "./pages/ReceiptPage.tsx";
import CartPage from "./pages/CartPage.tsx";
import MenuPage from "./pages/MenuPage.tsx";


function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<MenuPage />} />
                <Route path="/menu" element={<MenuPage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/cart/order" element={<OrderPage />} />
                <Route path="/receipt" element={<ReceiptPage />} />
            </Routes>
        </Router>
    );
}

export default App;