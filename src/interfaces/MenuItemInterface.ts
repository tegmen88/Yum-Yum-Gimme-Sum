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
    id: string;
    name: string;
    price: number;
    type?: 'wonton' | 'dip' | 'drink';
    description?: string;
    category?: string;
    ingredients?: string;
}

export const menuTypes = [
    { type: 'wonton', title: 'Wonton' },
    { type: 'dip', title: 'Dipsås ' },
    { type: 'drink', title: 'Läsk' },
];