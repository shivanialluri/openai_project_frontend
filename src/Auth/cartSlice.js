import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    items: [], 
    // will store an array of product objects
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const existingIndex = state.items.findIndex(item => item.id === action.payload.id);

            if (existingIndex >= 0) {
                state.items[existingIndex].quantity += 1; // Increase quantity if already in cart
            } else {
                const newItem = { ...action.payload, quantity: 1 }; // Set initial quantity
                state.items.push(newItem);
            }
        },
        removeFromCart: (state, action) => {
            console.log("Current items before removal:", state.items);
            console.log("Item ID to remove:", action.payload);
            state.items = state.items.filter(item => item.id !== action.payload.id);
            console.log("Items after removal:", state.items);
        },
        incrementQuantity: (state, action) => {
            const index = state.items.findIndex(item => item.id === action.payload);
            if (index >= 0) {
                state.items[index].quantity += 1;
            }
        },
        decrementQuantity: (state, action) => {
            const index = state.items.findIndex(item => item.id === action.payload);
            if (index >= 0 && state.items[index].quantity > 1) {
                state.items[index].quantity -= 1;
            }
        },
        clearCart: (state) => {
            state.items = []; 
            // Clears all items from the cart
        }

    },
});

export const { addToCart, removeFromCart, incrementQuantity, decrementQuantity, clearCart } = cartSlice.actions;

export default cartSlice.reducer;