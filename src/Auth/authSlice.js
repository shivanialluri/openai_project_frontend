import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isAuthenticated: false,
        user: null,
    },
    reducers: {
        signup: (state, action) => {
            state.isAuthenticated = true;
            state.user = action.payload;
        },
        login: (state, action) => {
            state.isAuthenticated = true;
            state.user = action.payload;
        },
        logout: (state) => {
            state.isAuthenticated = false;
            state.user = null;
        },
    },
});

export const { signup, login, logout } = authSlice.actions;
export default authSlice.reducer;
