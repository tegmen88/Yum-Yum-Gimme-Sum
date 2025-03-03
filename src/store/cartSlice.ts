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
        addToCart(state, action: PayloadAction<ICartItem>) {
            state.items.push(action.payload);
        },
        removeFromCart(state, action: PayloadAction<string>) {
            state.items = state.items.filter(item => item.id !== action.payload);
        },
    },
});

export const { addToCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;