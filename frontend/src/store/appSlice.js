import { createSlice } from '@reduxjs/toolkit';

const appSlice = createSlice({
    name: 'app',
    initialState: {
        user: null,
        isAuthenticated: false,
        recipe: [],
        savedRecipe: [],
        userRecipe: [],
        error: null,
        loading: false,
    },
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
            state.isAuthenticated = !!action.payload;
        },
        logout: (state) => {
            state.user = null;
            state.isAuthenticated = false;
            state.savedRecipe = [];
            state.userRecipe = [];
            localStorage.removeItem('token');
        },
        clearError: (state) => {
            state.error = null;
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
    },
});

export const { setUser, logout, clearError, setLoading } = appSlice.actions;
export default appSlice.reducer;
