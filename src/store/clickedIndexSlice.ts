import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: 0,
};

export const clickedIndexSlice = createSlice({
  name: "clickedIndex",
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    setIndex: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { increment, decrement, setIndex } = clickedIndexSlice.actions;
export default clickedIndexSlice.reducer;
