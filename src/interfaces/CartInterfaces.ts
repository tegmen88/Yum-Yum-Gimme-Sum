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

