// Konfiguration av Redux Store

import { configureStore, combineReducers } from '@reduxjs/toolkit';
import menuReducer from './menuSlice';
import cartReducer from './cartSlice';
import orderReducer from './orderSlice';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; //  localStorage används för att lagra data

// Skapa en konfiguration för redux-persist
const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['cart'],
};

// Kombinera alla reducers
const rootReducer = combineReducers({
    menu: menuReducer,
    cart: cartReducer,
    order: orderReducer,
});

// Skapa en persistReducer baserat på konfigureringen
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Konfigurera store med persistReducer
export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false, // Behövs för att hantera redux-persist
        }),
});

// Skapa en persistor för att hantera localStorage
export const persistor = persistStore(store);

// Exportera store-typer
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;