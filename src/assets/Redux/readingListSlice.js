import { createSlice } from "@reduxjs/toolkit";

const readingListSlice = createSlice({
  initialState: {
    books: [],
  },
  name: "readingList",
  reducers: {
    addToList: (state, action) => {
      const existing = state.books.find(
        (state) => state.id === action.payload.id
      );
      if (existing) {
        console.log(action.payload);
        existing.quantity += 1;
      } else {
        console.log(action.payload);
        state.books.push({ ...action.payload, quantity: 1 });
      }
      console.log(action.payload);
    },
    removeFromList: (state, action) => {
      state.books = state.books.filter(
        (state) => state.id !== action.payload.id
      );
    },
  },
});

export const { addToList, removeFromList } = readingListSlice.actions;
export default readingListSlice.reducer;
