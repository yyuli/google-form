import { configureStore } from '@reduxjs/toolkit';
import clickedIndexReducer from './clickedIndexSlice';
import questionListItemReducer from './questionListItemSlice';
import selectedBoxReducer from "./selectedBoxSlice";
import surveyReducer from "./surveySlice";

export const store = configureStore({
  reducer: {
    clickedIndex: clickedIndexReducer,
    questionListItem: questionListItemReducer,
    selectedBox: selectedBoxReducer,
    survey: surveyReducer,
  },
})
