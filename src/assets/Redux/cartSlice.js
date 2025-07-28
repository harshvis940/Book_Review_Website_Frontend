import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
  },
  reducers: {
    addToCart: (state, action) => {
      const existing = state.items.find((item) => item.id === action.payload);
      if (existing) {
        existing.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
    },

    removeFromCart: (state, action) => {
      console.log(action);
      state.items = state.items.filter((item) => item.id !== action.payload.id);
    },
    clearCart: (state, action) => {
      state.items = [];
    },
    decreaseQuantity: (state, action) => {
      const existing = state.items.find(
        (item) => item.id === action.payload.id
      );
      if (existing && existing.quantity > 1) existing.quantity -= 1;
      else
        state.items = state.items.filter((item) => item.id !== action.payload);
    },
    increaseQuantity: (state, action) => {
      const existing = state.items.find(
        (item) => item.id === action.payload.id
      );
      existing.quantity += 1;
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  clearCart,
  decreaseQuantity,
  increaseQuantity,
} = cartSlice.actions;
export default cartSlice.reducer;
