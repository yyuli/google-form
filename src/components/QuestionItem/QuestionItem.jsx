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
import {
  QuestionListDiv,
  QuestionListEtcDiv,
  QuestionListInput,
} from "../QuestionBox/QuestionBoxStyle";

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
        {item.etc && (
          <QuestionListDiv>
            <img src={circle} alt="빈 라디오 버튼" />
            <QuestionListEtcDiv>
              <QuestionListInput type="text" placeholder="기타..." readOnly />
            </QuestionListEtcDiv>
          </QuestionListDiv>
        )}
      </ul>
    </QuestionItemWrap>
  );
}
