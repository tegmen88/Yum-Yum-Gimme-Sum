import React, { useEffect, useState } from 'react';
import { fetchMenu } from '../api/api.ts';
import { IMenuItem } from '../interfaces/MenuItemInterface';

const MenuPage: React.FC = () => {
    const [menu, setMenu] = useState<IMenuItem[]>([]); // State för menyn
    const [loading, setLoading] = useState<boolean>(true); // För laddningsindikation
    const [error, setError] = useState<string | null>(null); // För hantering av fel

    useEffect(() => {
        const loadMenu = async () => {
            try {
                setLoading(true);
                const menuItems = await fetchMenu(); // Hämta API-datan
                console.log('Hämtad meny från API:', menuItems);

                // Plocka ut "items" från API-svaret
                if (menuItems && menuItems.items) {
                    setMenu(menuItems.items); // Uppdatera menu med arrayen "items"
                    console.log('Uppdaterad meny state:', menuItems.items);
                } else {
                    throw new Error('Felaktigt API-svar: "items" saknas.');
                }
            } catch (err: any) {
                console.error('Error loading menu:', err);
                setError(err.message || 'Ett fel inträffade.');
            } finally {
                setLoading(false);
            }
        };

        loadMenu();
    }, []);

    // Kontrollera laddnings- och felindikatorer innan du visar data
    if (loading) return <p>Laddar menyn...</p>;
    if (error) return <p>Fel vid laddning av menyn: {error}</p>;


    return (
        <div>
            <h1>Menyn</h1>
            <ul>
                {menu.map((item) => (
                    <li key={item.id || Math.random()}>
                        <h3>{item.name || 'N/A'} - {item.price || 0} kr</h3>
                        {/*<p>{item.description || 'Ingen beskrivning tillgänglig.'}</p>*/}
                        {item.ingredients && item.ingredients.length > 0 && (
                            <ul>
                                {item.ingredients && Array.isArray(item.ingredients) && item.ingredients.map((ingredient, index) => (
                                    <li key={index}>{ingredient}</li>
                                ))}
                            </ul>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default MenuPage;