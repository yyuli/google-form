import React from "react";
import QuestionItem from "../QuestionItem/QuestionItem";
import { useSelector } from "react-redux";

export default function QuestionList() {
  const questionListItem = useSelector((state) => state.questionListItem.value);
  return (
    <>
      {questionListItem.map((item, index) => (
        <QuestionItem key={index} item={item} index={index} />
      ))}
    </>
  );
}
