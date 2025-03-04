// Redux slice för varukorgen

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {CartState, ICartActionPayload } from "../interfaces/CartInterfaces.ts";
import {RootState} from "./store.ts";

const initialState: CartState = {
    items: [],
};


const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        // addToCart(state, action: PayloadAction<ICartItem>) {
        //     state.items.push(action.payload);
        // },

        addToCart(state, action: PayloadAction<ICartActionPayload>) {
            const existingItem = state.items.find((item) => item.id === action.payload.id);

            if (existingItem) {
                // Om produkten redan finns, uppdatera kvantitet
                existingItem.quantity += action.payload.quantity || 1; // Default till 1
            } else {
                // Om produkten inte finns, lägg till den som ny
                state.items.push({
                    id: action.payload.id,
                    name: action.payload.name || 'Okänd Produkt', // Default fallback om name saknas
                    price: action.payload.price || 0, // Default till 0 om price saknas
                    quantity: action.payload.quantity || 1, // Default till 1
                });
            }
        },

        removeFromCart(state, action: PayloadAction<{ id: string; quantity?: number }>) {
            const existingItem = state.items.find((item) => item.id === action.payload.id);

            if (existingItem) {
                if (action.payload.quantity) {
                    // Minska kvantitet med angivet värde
                    existingItem.quantity -= action.payload.quantity;

                    // Ta bort artikeln från listan om kvantiteten når 0 eller mindre
                    if (existingItem.quantity <= 0) {
                        state.items = state.items.filter(item => item.id !== action.payload.id);
                    }
                } else {
                    // Om ingen `quantity` angiven, ta bort artikeln direkt
                    state.items = state.items.filter(item => item.id !== action.payload.id);
                }
            }
        },


        //removeFromCart(state, action: PayloadAction<string>) {
          //  state.items = state.items.filter(item => item.id !== action.payload);
    },
});

// Selectors (lägg här under reducer-logiken)
export const selectCartItems = (state: RootState) => state.cart.items; // Alla artiklar
export const selectCartCount = (state: RootState) =>
    state.cart.items.reduce((count, item) => count + item.quantity, 0); // Totalt antal artiklar
export const { addToCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;