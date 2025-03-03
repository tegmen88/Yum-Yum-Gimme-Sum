// Redux slice för beställningar

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Definiera typ för state
interface OrderState {
    orders: { id: string; items: string[]; total: number }[];
}

const initialState: OrderState = {
    orders: [],
};

// Skapa en slice
const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        addOrder(state, action: PayloadAction<{ id: string; items: string[]; total: number }>) {
            state.orders.push(action.payload);
        },
        removeOrder(state, action: PayloadAction<string>) {
            state.orders = state.orders.filter(order => order.id !== action.payload);
        },
        clearOrders(state) {
            state.orders = [];
        },
    },
});

export const { addOrder, removeOrder, clearOrders } = orderSlice.actions;
export default orderSlice.reducer;