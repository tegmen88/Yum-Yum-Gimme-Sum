import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './styles/global.scss';
import OrderPage from "./pages/OrderPage.tsx";
import ReceiptPage from "./pages/ReceiptPage.tsx";
import CartPage from "./pages/CartPage.tsx";
import MenuPage from "./pages/MenuPage.tsx";
import MenuItem from "./components/MenuItem.tsx";
import {useEffect, useState} from "react";
import {fetchMenu, getApiKey, createTenant} from "./api/api.ts";


function App() {
    const [apiKey, setApiKey] = useState<string | null>(null); // Hantera API-nyckel som state

    useEffect(() => {
        const loadMenu = async () => {
            try {
                const menu = await fetchMenu();
                console.log("Menu loaded:", menu);
            } catch (err) {
                console.error("Error loading menu:", err);
            }
        };

        const setupTenant = async () => {
            try {
                // Hämta API-nyckel
                const key = await getApiKey();
                setApiKey(key);

                // Skapa en tenant
                const tenantName = "my-foodtruck";
                await createTenant(key, tenantName);

                console.log(`Tenant "${tenantName}" har skapats.`);
            } catch (error) {
                console.error("Fel vid uppsättning av tenant:", error);
            }
        };


        loadMenu();
        setupTenant();

    }, []);


        return (
        <Router>

            <Routes>
                <Route path="/" element={<MenuPage />} />
                <Route path="/menu" element={<MenuPage />} />

                <Route path="/menu/item/:itemId" element={<MenuItem />} />

                <Route path="/cart" element={<CartPage />} />
                <Route path="/order" element={<OrderPage />} />
                <Route path="/receipt" element={<ReceiptPage />} />
            </Routes>
        </Router>
    );
}

export default App;