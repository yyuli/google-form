import React, { useCallback, useEffect, useState } from "react";
import QuestionItem from "../QuestionItem/QuestionItem";
import { useSelector } from "react-redux";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { setQuestionListItem } from "../../store/questionListItemSlice";
import { useDispatch } from "react-redux";
import { decrement, increment, setIndex } from "../../store/clickedIndexSlice";

export default function QuestionList() {
  const questionListItem = useSelector((state) => state.questionListItem.value);
  const clickedIndex = useSelector((state) => state.clickedIndex.value);
  const dispatch = useDispatch();
  const [dragResult, setDragResult] = useState(null);
  useEffect(() => {
    if (dragResult) {
      handleStateUpdate(dragResult);
      setDragResult(null);
    }
  }, [dragResult]);
  const onDragEnd = (result) => {
    setDragResult(result);
  };
  const handleStateUpdate = useCallback(
    (result) => {
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
      // if (clickedIndex === source.index) {
      //   dispatch(setIndex(destination.index));
      // } else if (
      //   source.index < clickedIndex &&
      //   destination.index >= clickedIndex
      // ) {
      //   dispatch(decrement());
      // } else if (
      //   source.index > clickedIndex &&
      //   destination.index <= clickedIndex
      // ) {
      //   dispatch(increment());
      // }
      dispatch(setIndex(destination.index));
    },
    [questionListItem, clickedIndex, dispatch]
  );
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppableId">
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
