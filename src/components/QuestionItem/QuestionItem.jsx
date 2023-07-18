import React, { useState } from "react";
import circle from "../../assets/images/circle.svg";
import { QuestionDragBtn } from "../QuestionBox/QuestionBoxStyle";
import {
  QuestionItemWrap,
  QuestionItemDragDiv,
  QuestionItemTitle,
  QuestionItemLi,
  QuestionItemP,
} from "./QuestionItemStyle";

export default function QuestionItem({ item }) {
  const [isQuestionItemHovered, setIsQuestionItemHovered] = useState(false);
  return (
    <QuestionItemWrap
      onMouseEnter={() => setIsQuestionItemHovered(true)}
      onMouseLeave={() => setIsQuestionItemHovered(false)}
    >
      <QuestionItemDragDiv>
        {isQuestionItemHovered && <QuestionDragBtn />}
      </QuestionItemDragDiv>
      <QuestionItemTitle>{item.title}</QuestionItemTitle>
      <ul>
        {item.items.map((item, index) => (
          <QuestionItemLi key={index}>
            <img src={circle} alt="빈 라디오 버튼" />
            <QuestionItemP>{item}</QuestionItemP>
          </QuestionItemLi>
        ))}
      </ul>
    </QuestionItemWrap>
  );
}
