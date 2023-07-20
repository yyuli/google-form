import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: 0,
}

export const clickSlice = createSlice({
  name: 'click',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    setIndex: (state, action) => {
      state.value = action.payload;
    }
  },
})

export const { increment, setIndex } = clickSlice.actions
export default clickSlice.reducer
