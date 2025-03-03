import React, { useEffect, useState } from 'react';
import { fetchMenu } from '../api/api.ts';
import { IMenuItem } from '../interfaces/MenuItemInterface';
import '../styles/menu.scss';

const MenuPage: React.FC = () => {
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
                            <li key={item.id}>
                                <h3>
                                    {item.name} - {item.price || 0} kr
                                </h3>
                                <p>{item.ingredients || 'Ingen ingrediens tillgänglig.'}</p>

                                {/* Visa ingredienser med mellanslag mellan varje */}
                                {item.ingredients &&
                                    typeof item.ingredients === 'string' &&
                                    item.ingredients.length > 0 && (
                                        <ul className="ingredients-list">
                                            {item.ingredients.split(', ').map((ingredient, index) => (
                                                <li key={index} className="ingredient-item">
                                                    {ingredient.trim()}
                                                </li>
                                            ))}
                                        </ul>
                                    )}
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
                                {item.name} {/* Visa endast namn */}
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
                                <p>{item.name}</p> {/* Visa endast namn */}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>

    );
};

export default MenuPage;