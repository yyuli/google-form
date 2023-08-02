import { createSlice } from "@reduxjs/toolkit";

export const addState = {
  value: [
    {
      title: "",
      items: ["옵션 1"],
      etc: false,
      type: "객관식 질문",
      required: false,
    },
  ],
};

const initialState = {
  value: [
    {
      title: "제목 없는 질문",
      items: ["옵션 1"],
      etc: false,
      type: "객관식 질문",
      required: false,
    },
  ],
};

export const questionListItemSlice = createSlice({
  name: "questionListItem",
  initialState,
  reducers: {
    setQuestionListItem: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setQuestionListItem } = questionListItemSlice.actions;
export default questionListItemSlice.reducer;
