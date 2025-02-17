import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    favoriteRecipes: [], // Pastikan diinisialisasi dengan array kosong
};

const favoritesSlice = createSlice({
    name: 'favorites',
    initialState,
    reducers: {
        toggleFavorite: (state, action) => {
            const existingIndex = state.favoriteRecipes.findIndex(
                (recipe) => recipe.idFood === action.payload.idFood
            );
            if (existingIndex >= 0) {
                state.favoriteRecipes.splice(existingIndex, 1);
            } else {
                state.favoriteRecipes.push(action.payload);
            }
        },
    },
});

export const { toggleFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;