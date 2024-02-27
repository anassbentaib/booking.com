import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  deleteReservations,
  getReservationByListingId,
  getReservationsByUserId,
} from "../api";

const initialState = {
  reservations: null,
  isLoading: false,
  error: null,
};

export const deleteReservation = createAsyncThunk(
  "reservations/deleteReservation",
  async (deletingId: string, { rejectWithValue }) => {
    try {
      const response = await deleteReservations(deletingId);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const fetchReservationsByUserId = createAsyncThunk(
  "reservations/fetchReservationsByUserId",
  async (userId: string, { rejectWithValue }) => {
    try {
      const response = await getReservationsByUserId(userId);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response ? error.response.data : "Error occurred"
      );
    }
  }
);
export const fetchReservationsByListingId = createAsyncThunk(
  "reservations/fetchReservationsByListingId",
  async (listingId: string, { rejectWithValue }) => {
    try {
      const response = await getReservationByListingId(listingId);
      console.log("🚀 ~ response:", response);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response ? error.response.data : "Error occurred"
      );
    }
  }
);
const reservationsSlice = createSlice({
  name: "reservations",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchReservationsByUserId.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchReservationsByUserId.fulfilled, (state, action) => {
        state.isLoading = false;
        state.reservations = action.payload;
      })
      .addCase(fetchReservationsByUserId.rejected, (state: any, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(fetchReservationsByListingId.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchReservationsByListingId.fulfilled, (state, action) => {
        state.isLoading = false;
        state.reservations = action.payload;
      })
      .addCase(fetchReservationsByListingId.rejected, (state: any, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(deleteReservation.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteReservation.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(deleteReservation.rejected, (state: any, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default reservationsSlice.reducer;
