import { useState } from 'react';
import {placeOrder} from "../api/api.ts";

const OrderPage = () => {
    const [eta, setEta] = useState<number | null>(null); // Typa eta som nummer eller null
    const [error, setError] = useState<string | null>(null); // Hantera felmeddelanden
    const [loading, setLoading] = useState(false); // Lägg till en loader state

    const handlePlaceOrder = async () => {
        setError(null); // Återställ fel
        setLoading(true); // Visa att laddning pågår

        try {
            const data = await placeOrder([]); // Använd den modulära API-funktionen
            setEta(data.eta); // Sätt ETA från API-svaret
        } catch (err: any) {
            setError(err.message); // Hantera och visa fel
        } finally {
            setLoading(false); // Avsluta laddningen
        }
    };

    return (
        <div>
            <h1>Beställning</h1>
            <button onClick={handlePlaceOrder} disabled={loading}>
                {loading ? 'Laddar...' : 'Lägg beställning'}
            </button>
            {eta && <p>Beräknad ankomsttid: {eta} minuter</p>}
            {error && <p style={{ color: 'red' }}>Fel: {error}</p>}
        </div>
    );
};

export default OrderPage;