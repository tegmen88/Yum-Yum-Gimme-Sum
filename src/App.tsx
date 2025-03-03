import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './styles/global.scss';
import OrderPage from "./pages/OrderPage.tsx";
import ReceiptPage from "./pages/ReceiptPage.tsx";
import CartPage from "./pages/CartPage.tsx";
import MenuPage from "./pages/MenuPage.tsx";
import MenuItem from "./components/MenuItem.tsx";
import {useEffect} from "react";
import {fetchMenu} from "./api/api.ts";


function App() {

    useEffect(() => {
        const loadMenu = async () => {
            try {
                const menu = await fetchMenu();
                console.log("Menu loaded:", menu);
            } catch (err) {
                console.error("Error loading menu:", err);
            }
        };

        loadMenu();
    }, []);


        return (
        <Router>
            <Routes>
                <Route path="/" element={<MenuPage />} />
                <Route path="/menu" element={<MenuPage />} />

                <Route path="/menu/item/:itemId" element={<MenuItem />} />

                <Route path="/cart" element={<CartPage />} />
                <Route path="/cart/order" element={<OrderPage />} />
                <Route path="/receipt" element={<ReceiptPage />} />
            </Routes>
        </Router>
    );
}

export default App;