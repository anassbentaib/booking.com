// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import { addFavorite, removeFavorite, getFavoritesByUserId } from "../api";
// import { toast } from "react-hot-toast";

// export const toggleFavorite = createAsyncThunk(
//   "user/toggleFavorite",
//   async ({ userId, listingId, isFavorited }, { rejectWithValue }) => {
//     console.log("🚀 ~ isFavorited:", isFavorited);
//     console.log("🚀 ~ listingId:", listingId);
//     console.log("🚀 ~ userId:", userId);
//     try {
//       if (isFavorited) {
//         await removeFavorite(userId, listingId);
//         toast.success("item removed.");
//       } else {
//         await addFavorite(userId, listingId);
//         toast.success("item added.");
//       }
//       return { userId, listingId, isFavorited };
//     } catch (error: any) {
//       toast.error("Sotho.");

//       return rejectWithValue(
//         error.response ? error.response.data : "Error occurred"
//       );
//     }
//   }
// );
// export const fetchFavoritesByUserId = createAsyncThunk(
//   "cart/fetchFavByUserId",
//   async (userId: string, { rejectWithValue }) => {
//     try {
//       const response = await getFavoritesByUserId(userId);
//       return response.data;
//     } catch (error: any) {
//       return rejectWithValue(
//         error.response ? error.response.data : "Error occurred"
//       );
//     }
//   }
// );

// const userSlice = createSlice({
//   name: "cart",
//   initialState: {
//     favoriteIds: [],
//     favoriteIdss: [],
//     isLoading: false,
//   },
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(toggleFavorite.fulfilled, (state, action) => {
//         const { userId, listingId, isFavorited } = action.payload;
//         if (isFavorited) {
//           state.favoriteIds = state.favoriteIds.filter(
//             (id) => id !== listingId
//           );
//         } else {
//           state.favoriteIds.push(listingId);
//         }
//       })
//       .addCase(fetchFavoritesByUserId.pending, (state: any) => {
//         state.isLoading = true;
//         state.error = null;
//       })
//       .addCase(fetchFavoritesByUserId.fulfilled, (state, action) => {
//         state.isLoading = false;
//         state.favoriteIds = action.payload;
//       })
//       .addCase(fetchFavoritesByUserId.rejected, (state: any, action) => {
//         state.isLoading = false;
//         state.error = action.payload;
//       });
//   },
// });

// export default userSlice.reducer;
