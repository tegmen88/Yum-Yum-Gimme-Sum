// Definierar typen för varje objekt i varukorgen

export interface MenuState {
    items: IMenuItem[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed'; // visa en status för se om menyn laddas
    currentItemId: string | null; // Kan vara null om ingen artikel är vald
}

export interface IMenuItemTest {
        id: string;
        name: string;
        price: number;
}

// Definiera strukturen för en menyartikel (justera efter API-svar)
export interface IMenuItem {
    id: string;         // Exempelvis ett unikt ID för varje menyartikel
    name: string;       // Namn på rätten, t.ex. "Spaghetti Bolognese"
    price: number;      // Pris på rätten, t.ex. 89.00
    description?: string; // En valfri beskrivning av rätten
    category?: string;  // T.ex. "Förrätt", "Huvudrätt" etc.
    ingredients?: string;
}