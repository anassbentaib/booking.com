import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { api } from "./state/api";
import userReducer from "./state/userSlice";
import searchModalReducer from "./state/SearchSlice";
import ListingReducer from "./state/listingsSlice";
import reservationReducer from "./state/reservationSlice";
import FavoritesReducer from "./state/favoritesSlice";
const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    user: userReducer,
    reservations: reservationReducer,
    searchModal: searchModalReducer,
    listings: ListingReducer,
    favorites: FavoritesReducer,
  },
  middleware: (getDefault) => getDefault().concat(api.middleware),
});
setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
