// Definierar typen för varje objekt i varukorgen

export interface CartState {
    items: ICartItem[];
}

export interface ICartItem {
    id: string;
    name: string;
    price: number;
    quantity: number;
}

// Typ för `addToCart` och `removeFromCart` inputs
export interface ICartActionPayload {
    id: string;
    name?: string; // Valfritt
    price?: number; // Valfritt
    quantity?: number; // Valfritt
}
