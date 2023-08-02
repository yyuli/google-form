import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  title: localStorage.getItem("title") || "제목 없는 설문지",
  description: localStorage.getItem("description") || "",
};

export const surveySlice = createSlice({
  name: "survey",
  initialState,
  reducers: {
    setTitle: (state, action) => {
      state.title = action.payload;
    },
    setDescription: (state, action) => {
      state.description = action.payload;
    },
  },
});

export const { setTitle, setDescription } = surveySlice.actions;
export default surveySlice.reducer;
