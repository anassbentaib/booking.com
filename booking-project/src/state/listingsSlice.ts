import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { deleteListing, getListingsByUserId, getSearchedPosts } from "../api";
const initialState = {
  listings: null,
  isLoading: false,
  error: null,
  data: [],
  loading: false,
};

export const handleDeleteListing = createAsyncThunk(
  "listings/handleDeleteListing",
  async (deletingId: string, { rejectWithValue }) => {
    try {
      const response = await deleteListing(deletingId);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const fetchListingByUserId = createAsyncThunk(
  "listings/fetchListingByUserId",
  async (userId: string, { rejectWithValue }) => {
    try {
      const response = await getListingsByUserId(userId);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response ? error.response.data : "Error occurred"
      );
    }
  }
);
export const fetchPostsAsync = (queryParams: any) => async (dispatch: any) => {
  try {
    dispatch(fetchListingsStart());
    const response = await getSearchedPosts(queryParams);
    dispatch(fetchListingsSuccess(response.data));
  } catch (error: any) {
    dispatch(fetchListingsFailure(error.message));
  }
};
const listingsSlice = createSlice({
  name: "listings",
  initialState,
  reducers: {
    fetchListingsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchListingsSuccess: (state, action) => {
      state.loading = false;
      state.data = action.payload;
    },
    fetchListingsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchListingByUserId.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchListingByUserId.fulfilled, (state, action) => {
        state.isLoading = false;
        state.listings = action.payload;
      })
      .addCase(fetchListingByUserId.rejected, (state: any, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(handleDeleteListing.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(handleDeleteListing.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(handleDeleteListing.rejected, (state: any, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const {
  fetchListingsStart,
  fetchListingsSuccess,
  fetchListingsFailure,
} = listingsSlice.actions;
export default listingsSlice.reducer;
