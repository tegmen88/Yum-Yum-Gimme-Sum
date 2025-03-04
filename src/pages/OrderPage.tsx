import {useEffect, useState} from 'react';
import {getApiKey, placeOrder} from "../api/api.ts";
import '../styles/order.scss';
import Navbar from "../components/Navbar.tsx";
import {useLocation} from "react-router-dom";

const OrderPage = () => {
    const [eta, setEta] = useState<number>(15 * 60);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const location = useLocation();

    const orderId = location.state?.orderNr || "Okänt"; // Hämta ordernummer från staten
    const etaFromServer = location.state?.eta || null;
    const [formattedEta, setFormattedEta] = useState<string>("");


    // Konvertera tid i sekunder till minuter och sekunder
    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes}:${secs < 10 ? `0${secs}` : secs}`;
    };

    // Sätt ETA från servern
    useEffect(() => {
        if (etaFromServer) {
            const estimatedTime = new Date(etaFromServer).getTime(); // Omvandla ETA till millisekunder
            const now = Date.now();
            const remainingTime = Math.max(Math.floor((estimatedTime - now) / 1000), 0); // Tid i sekunder
            setEta(remainingTime);
        }
    }, [etaFromServer]);

    // Starta en nedräkning för ETA
    useEffect(() => {
        if (eta === null) return;

        const timer = setInterval(() => {
            setEta((prevEta) => {
                if (prevEta === null || prevEta <= 0) {
                    clearInterval(timer); // Stoppa när tiden är ute
                    return 0;
                }
                return prevEta - 1; // Räkna ner 1 sekund
            });
        }, 1000);

        // Rensa intervallet när komponenten avmonteras

        return () => clearInterval(timer);
    }, [eta]);

    useEffect(() => {
        if (eta !== null) {
            setFormattedEta(formatTime(eta));
        }
    }, [eta]);


    const handlePlaceOrder = async () => {
        setError(null);
        setLoading(true);

        try {
            const tenant = "my-foodtruck";
            const apiKey = await getApiKey(); // API-nyckeln hämtas från backend
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
        <>
            <div className='order-container'>
                {/* Vänsterlogga */}
                <Navbar />

                <figure>
                    <img src="../public/boxtop.png" alt="Placeholder" />
                </figure>

                <h1>DINA WONTONS TILLAGAS</h1>
                <h3>ETA: {formatTime(eta)}</h3>
                <h3>#{orderId}</h3>

                <button onClick={handlePlaceOrder} disabled={loading}>
                    {loading ? 'Laddar...' : 'Lägg till en ny beställning'}
                </button>
                {/*{eta && <p>Beräknad ankomsttid: {eta} minuter</p>}*/}
                {error && <p style={{ color: 'red' }}>Fel: {error}</p>}
                <button>Se kvitto</button>
            </div>
        </>
    );
};

export default OrderPage;