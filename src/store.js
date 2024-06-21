import { configureStore } from '@reduxjs/toolkit';
import authReducer from './Auth/authSlice';
import cartReducer from './Auth/cartSlice'


export const store = configureStore({
    reducer: {
        auth: authReducer,
        cart: cartReducer,
    },
});