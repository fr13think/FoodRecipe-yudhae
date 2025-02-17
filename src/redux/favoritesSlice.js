import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    favoriteRecipes: [], // Inisialisasi dengan array kosong
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
                // Jika resep sudah ada di daftar favorit, hapus dari daftar
                state.favoriteRecipes.splice(existingIndex, 1);
            } else {
                // Jika resep belum ada di daftar favorit, tambahkan ke daftar
                state.favoriteRecipes.push(action.payload);
            }
        },
    },
});

export const { toggleFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;