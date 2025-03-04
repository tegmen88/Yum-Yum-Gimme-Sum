import { useState } from 'react';
import {placeOrder} from "../api/api.ts";
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
            const data = await placeOrder([]); // modulära API-funktionen
            setEta(data.eta); //  ETA sätts från API-svaret
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