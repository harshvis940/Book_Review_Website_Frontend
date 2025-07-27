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
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    clearCart: (state, action) => {
      state.items = [];
    },
    decreaseQuantity: (state, action) => {
      const existing = state.items.find((item) => item.id === action.payload);
      if (existing && existing.quantity > 1) existing.quantity -= 1;
      else
        state.items = state.items.filter((item) => item.id !== action.payload);
    },
  },
});

export const { addToCart, removeFromCart, clearCart, decreaseQuantity } =
  cartSlice.actions;
export default cartSlice.reducer;
