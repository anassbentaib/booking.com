import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addToFavorites,
  getFavoritesByUserId,
  removeFromFavorites,
} from "../api";
import toast from "react-hot-toast";

export const fetchFavoritesByUserId = createAsyncThunk(
  "cart/fetchFavotiteByUserId",
  async (userId: string, { rejectWithValue }) => {
    try {
      const response = await getFavoritesByUserId(userId);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response ? error.response.data : "Error occurred"
      );
    }
  }
);

export const handleAddToFavorite = createAsyncThunk(
  "cart/addToFavorites",
  async ({ userId, listingId }, { rejectWithValue }) => {
    try {
      const response = await addToFavorites(userId, listingId);
      //   await fetchFavoritesByUserId(userId);
      toast.success("added");

      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response ? error.response.data : "Error occurred"
      );
    }
  }
);

export const handleRemoveFromFavorites = createAsyncThunk(
  "cart/removeFromFavorites",
  async (listingId: string, { rejectWithValue }) => {
    try {
      const response = await removeFromFavorites(listingId);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response ? error.response.data : "Error occurred"
      );
    }
  }
);

const favoritesSlice = createSlice({
  name: "favorites",
  initialState: {
    favorites: [],
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(handleAddToFavorite.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(handleAddToFavorite.fulfilled, (state, action) => {
        state.isLoading = false;
        state.favorites = action.payload;
      })
      .addCase(handleAddToFavorite.rejected, (state: any, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(handleRemoveFromFavorites.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(handleRemoveFromFavorites.fulfilled, (state: any, action) => {
        console.log("🚀 ~ .addCase ~ state:", state);
        console.log("🚀 ~ .addCase ~ state:", state.favorites);

        console.log(
          "🚀 ~ .addCase ~ handleRemoveFromFavorites:",
          handleRemoveFromFavorites
        );
        state.isLoading = false;
        state.favorites = state.favorites.filter(
          (item: any) => item.id !== action.payload.id
        );
      })

      .addCase(handleRemoveFromFavorites.rejected, (state: any, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(fetchFavoritesByUserId.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchFavoritesByUserId.fulfilled, (state, action) => {
        state.isLoading = false;
        state.favorites = action.payload;
      })
      .addCase(fetchFavoritesByUserId.rejected, (state: any, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default favoritesSlice.reducer;
