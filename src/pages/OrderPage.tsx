import { useState } from 'react';
import {getApiKey, placeOrder} from "../api/api.ts";
import Navbar from "../components/Navbar.tsx";
import '../styles/order.scss';

const OrderPage = () => {
    const [eta, setEta] = useState<number | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handlePlaceOrder = async () => {
        setError(null);
        setLoading(true);

        try {
            const tenant = "my-foodtruck";
            const apiKey = await getApiKey(); // Hämta API-nyckeln från backend
            const items: number[] = []; // Tom array, fylls med produkt-ID:n senare

            const data = await placeOrder(tenant, apiKey, items);
            setEta(data.eta); // Spara och visa ETA
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className='order-container'>
            <Navbar />

            <h1>Beställning</h1>
            <button onClick={handlePlaceOrder} disabled={loading}>
                {loading ? 'Laddar...' : 'Lägg till en ny beställning'}
            </button>
            {eta && <p>Beräknad ankomsttid: {eta} minuter</p>}
            {error && <p style={{ color: 'red' }}>Fel: {error}</p>}
        </div>
    );
};

export default OrderPage;