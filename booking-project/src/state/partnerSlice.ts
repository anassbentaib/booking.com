import { createSlice } from "@reduxjs/toolkit";
const storedPartnerInfo = localStorage.getItem("partnerInfo");

const initialState = {
  currentPartner: storedPartnerInfo ? JSON.parse(storedPartnerInfo) : null,
  loading: false,
  error: false,
};

const PartnerSlice = createSlice({
  name: "partner",
  initialState,
  reducers: {
    signInStart: (state) => {
      state.loading = true;
    },
    signInSuccess: (state, action) => {
      state.currentPartner = action.payload;

      state.loading = false;
      state.error = false;
    },

    signInFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    signOut: (state) => {
      state.currentPartner = null;
      state.loading = false;
      state.error = false;
    },
  },
});

export const {
  signInStart,
  signInSuccess,
  signInFailure,

  signOut,
} = PartnerSlice.actions;
console.log("🚀 ~ signInSuccess:", signInSuccess);

export default PartnerSlice.reducer;
