// Redux slice för menyn

import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { fetchMenu } from '../api/api';
import { MenuState, IMenuItem } from '../interfaces/MenuItemInterface';

// Async Thunk för att hämta menyobjekt från API
export const fetchMenuItems = createAsyncThunk('menu/fetchMenuItems', async () => {
    return await fetchMenu();
});

// Initial state med korrekt typ
const initialState: MenuState = {
    items: [], // Lista med menyobjekt
    status: 'idle', // Status för API-förfrågan
    currentItemId: null, // ID för den aktuella menyposten
};

const menuSlice = createSlice({
    name: 'menu',
    initialState, // Använder nu korrekt typad initial state
    reducers: {
        // Reducer för att sätta det aktiva objektets ID
        setCurrentItem: (state, action: PayloadAction<string | null>) => {
            state.currentItemId = action.payload; // Ex. payload: 'id123'
        },
        setItems(state, action: PayloadAction<IMenuItem[]>) {
            state.items = action.payload; // Payload ska vara en IMenuItem[]
        },
        setCurrentItemId(state, action: PayloadAction<string | null>) {
            state.currentItemId = action.payload; // En sträng eller null
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchMenuItems.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(
                fetchMenuItems.fulfilled,
                (state, action: PayloadAction<IMenuItem[]>) => {
                    if (!action.payload || action.payload.length === 0) {
                        console.warn('Tom menydata returnerades från API');
                        state.status = 'failed';
                        return;
                    }

                    console.log('API Response:', action.payload); // API-data

                    state.status = 'succeeded';
                    state.items = action.payload; // Lägg till objekten i state
                }
            )
            .addCase(fetchMenuItems.rejected, (state, action) => {
                console.error('API Error:', action.error); // Felsök API-fel
                state.status = 'failed';
            });
    },
});

// Exportera actions
export const { setCurrentItem, setItems, setCurrentItemId } = menuSlice.actions;

// Exportera slice reducer
export default menuSlice.reducer;