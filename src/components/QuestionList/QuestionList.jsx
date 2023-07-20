import React, { useState } from "react";
import QuestionItem from "../QuestionItem/QuestionItem";

export default function QuestionList() {
  const initialItem = {
    title: "제목 없는 질문",
    items: ["옵션 1"],
    etc: false,
    type: "객관식 질문",
    required: false,
  };
  const [items, setItems] = useState([initialItem]);
  return (
    <>
      {items.map((item, index) => (
        <QuestionItem
          key={index}
          item={item}
          index={index}
          items={items}
          setItems={setItems}
        />
      ))}
    </>
  );
}
