import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: "QuestionBox",
}

export const selectedBoxSlice = createSlice({
  name: 'selectedBox',
  initialState,
  reducers: {
    setSelectedBox: (state, action) => {
      state.value = action.payload;
    }
  },
})

export const { setSelectedBox } = selectedBoxSlice.actions
export default selectedBoxSlice.reducer
