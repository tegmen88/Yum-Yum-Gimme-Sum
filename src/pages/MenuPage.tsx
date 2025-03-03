import React, { useEffect, useState } from 'react';
import { fetchMenu } from '../api/api.ts';
import { IMenuItem } from '../interfaces/MenuItemInterface';
import '../styles/menu.scss';
import {addToCart} from "../store/cartSlice.ts";
// import AddIcon from '@mui/icons-material/Add';
import { useDispatch } from 'react-redux';

const MenuPage: React.FC = () => {
    const dispatch = useDispatch();

    const [menu, setMenu] = useState<IMenuItem[]>([]); // State för menyn
    const [loading, setLoading] = useState<boolean>(true); // För laddningsindikation
    const [error, setError] = useState<string | null>(null); // För felhantering

    // Funktion för att ladda menyn från API
    useEffect(() => {
        const loadMenu = async () => {
            try {
                setLoading(true);
                const menuItems = await fetchMenu();
                if (menuItems && menuItems.items) {
                    setMenu(menuItems.items); // Spara menydata från API
                } else {
                    throw new Error('Felaktigt API-svar: "items" saknas.');
                }
            } catch (err: any) {
                setError(err.message || 'Ett fel inträffade.');
            } finally {
                setLoading(false);
            }
        };

        loadMenu();
    }, []);

    // Funktion lägga artiklar i varukorgen
    const handleAddToCart = (item: IMenuItem) => {
        dispatch(
            addToCart({
                id: item.id,
                name: item.name,
                price: item.price || 0,
                quantity: 1
            })
        );

        console.log(item);

    };

        // Visa laddningsmeddelande
    if (loading) return <p>Laddar menyn...</p>;

    // Visa felmeddelande
    if (error) return <p>Fel vid laddning av menyn: {error}</p>;

    // Separera data baserat på typer
    const foodItems = menu.filter((item) => item.type === 'wonton');
    const dipItems = menu.filter((item) => item.type === 'dip');
    const drinkItems = menu.filter((item) => item.type === 'drink');

    return (
        <div className="menu-container">
            <div className="menu-content">
                <h1>Menyn</h1>

                {/* Första sektionen: Mat */}
                <div className="menu-category food-category">
                    {/* Dölj rubriken här */}
                    <ul>
                        {foodItems.map((item) => (
                            <li key={item.id} className="menu-item" onClick={() => handleAddToCart(item)}>
                                <h3>
                                    {item.name} - {item.price || 0} kr
                                </h3>
                                <p>{item.ingredients || 'Ingen ingrediens tillgänglig'}</p>

                                {/* Knapp - utan synlighet */}
                                <button
                                    className="add-button"
                                    onClick={(e) => {
                                        e.stopPropagation(); // Hindra bubbla till <li> om det behövs
                                        handleAddToCart(item);
                                    }}
                                >
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Andra sektionen: Dippsåser */}
                <div className="menu-category dip-category">
                    <h2>Dippsåser 19 kr</h2>

                    <ul className="dipso-lists">
                        {dipItems.map((item) => (
                            <li key={item.id} className="dip-list-item">
                                {item.name}

                                <button onClick={() => handleAddToCart(item)}></button>

                            </li>
                        ))}
                    </ul>
                </div>

                {/* Tredje sektionen: Läsk */}
                <div className="menu-category drink-category">
                    <h2>Läsk 19 kr</h2>
                    <ul className="dips-lists">
                        {drinkItems.map((item) => (
                            <li key={item.id}>
                                <p>{item.name}</p>

                                <button onClick={() => handleAddToCart(item)}></button>

                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>

    );
};

export default MenuPage;