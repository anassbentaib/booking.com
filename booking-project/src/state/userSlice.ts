import { createSlice } from "@reduxjs/toolkit";
const storedUserInfo = localStorage.getItem("userInfo");

const initialState = {
  currentUser: storedUserInfo ? JSON.parse(storedUserInfo) : null,
  loading: false,
  error: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signInStart: (state) => {
      state.loading = true;
    },
    signInSuccess: (state, action) => {
      state.currentUser = action.payload;

      state.loading = false;
      state.error = false;
    },

    signInFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    signOut: (state) => {
      state.currentUser = null;
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
} = userSlice.actions;

export default userSlice.reducer;
