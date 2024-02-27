// import { createSlice } from "@reduxjs/toolkit";

// export interface User {
//   token?: string | null;
//   userData?: string | null;
// }

// const initialState: User = {
//   token: localStorage.getItem("user_token") || null,
//   userData: null,
// };

// const userSlice = createSlice({
//   name: "user",
//   initialState,
//   reducers: {
//     setToken(state, action) {
//       state.token = action.payload;
//       localStorage.setItem("user_token", action.payload || "");
//     },
//     setUserData(state, action) {
//       state.userData = action.payload;
//     },
//     logout: (state) => {
//       state.token = null;
//       state.userData = null;
//       localStorage.removeItem("user_token");
//     },
//   },
// });

// export const { setToken, setUserData, logout } = userSlice.actions;

// export default userSlice.reducer;
