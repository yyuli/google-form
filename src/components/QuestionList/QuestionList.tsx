import React, { useCallback, useEffect, useState } from "react";
import QuestionItem from "../QuestionItem/QuestionItem";
import { useSelector } from "react-redux";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { setQuestionListItem } from "../../store/questionListItemSlice";
import { useDispatch } from "react-redux";
import { setIndex } from "../../store/clickedIndexSlice";
import { RootState } from "../../store/store";
import { QuestionType } from "../QuestionBox/QuestionBox";

export interface ItemType {
  type: QuestionType;
  title: string;
  required: boolean;
  items: string[];
  etc: boolean;
}

export default function QuestionList() {
  const questionListItem = useSelector(
    (state: RootState) => state.questionListItem.value
  ) as ItemType[];
  const clickedIndex = useSelector(
    (state: RootState) => state.clickedIndex.value
  );
  const [dragResult, setDragResult] = useState(null);
  const dispatch = useDispatch();
  useEffect(() => {
    if (dragResult) {
      handleStateUpdate(dragResult);
      setDragResult(null);
    }
  }, [dragResult]);
  const onDragEnd = (result: any) => {
    setDragResult(result);
  };
  const handleStateUpdate = useCallback(
    (result: any) => {
      const { destination, source } = result;
      if (!destination) {
        return;
      }
      if (
        destination.droppableId === source.droppableId &&
        destination.index === source.index
      ) {
        return;
      }
      const newQuestionListItem = [...questionListItem];
      const [removed] = newQuestionListItem.splice(source.index, 1);
      newQuestionListItem.splice(destination.index, 0, removed);
      dispatch(setQuestionListItem(newQuestionListItem));
      dispatch(setIndex(destination.index));
    },
    [questionListItem, clickedIndex, dispatch]
  );
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppable-1">
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {questionListItem.map((item, index) => (
              <QuestionItem key={index} item={item} index={index} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}
