// Redux slice för varukorgen

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {CartState, ICartItem} from "../interfaces/CartInterfaces.ts";

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

        addToCart(state, action: PayloadAction<ICartItem>) {
            const existingItem = state.items.find((item) => item.id === action.payload.id);

            if (existingItem) {
                // Om produkten redan finns, uppdatera kvantitet
                existingItem.quantity += action.payload.quantity;
            } else {
                // Om produkten inte finns, lägg till den som ny
                state.items.push(action.payload);
            }
        },
        removeFromCart(state, action: PayloadAction<string>) {
            state.items = state.items.filter(item => item.id !== action.payload);
        },
    },
});

export const { addToCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;