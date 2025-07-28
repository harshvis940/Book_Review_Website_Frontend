import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import readingListReducer from "./readingListSlice";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    list: readingListReducer,
  },
});
