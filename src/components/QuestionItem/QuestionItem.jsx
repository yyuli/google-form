import React, { useState } from "react";
import square from "../../assets/images/square.svg";
import circle from "../../assets/images/circle.svg";
import { QuestionDragBtn } from "../QuestionBox/QuestionBoxStyle";
import {
  QuestionItemWrap,
  QuestionItemDragDiv,
  QuestionItemTitle,
  QuestionItemLi,
  QuestionItemP,
  QuestionListWrapDiv,
  QuestionItemRequiredSpan,
} from "./QuestionItemStyle";
import {
  QuestionListEtcDiv,
  QuestionListInput,
} from "../QuestionBox/QuestionBoxStyle";
import {
  QuestionListShortInput,
  QuestionListLongInput,
  QuestionListNumberSpan,
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
      <QuestionItemTitle>
        {item.title}
        {item.required && (
          <QuestionItemRequiredSpan>*</QuestionItemRequiredSpan>
        )}
      </QuestionItemTitle>
      <ul>
        {item.type === "단답형" && (
          <QuestionListShortInput
            type="text"
            placeholder="단답형 텍스트"
            readOnly
          />
        )}
        {item.type === "장문형" && (
          <QuestionListLongInput
            type="text"
            placeholder="장문형 텍스트"
            readOnly
          />
        )}
        {item.type === "객관식 질문" &&
          item.items.map((item, index) => (
            <QuestionItemLi key={index}>
              <img src={circle} alt="빈 라디오 버튼" />
              <QuestionItemP>{item}</QuestionItemP>
            </QuestionItemLi>
          ))}
        {item.type === "객관식 질문" && item.etc && (
          <QuestionListWrapDiv>
            <img src={circle} alt="빈 라디오 버튼" />
            <QuestionListEtcDiv>
              <QuestionListInput type="text" placeholder="기타..." readOnly />
            </QuestionListEtcDiv>
          </QuestionListWrapDiv>
        )}
        {item.type === "체크박스" &&
          item.items.map((item, index) => (
            <QuestionItemLi key={index}>
              <img src={square} alt="빈 라디오 버튼" />
              <QuestionItemP>{item}</QuestionItemP>
            </QuestionItemLi>
          ))}
        {item.type === "체크박스" && item.etc && (
          <QuestionListWrapDiv>
            <img src={square} alt="빈 라디오 버튼" />
            <QuestionListEtcDiv>
              <QuestionListInput type="text" placeholder="기타..." readOnly />
            </QuestionListEtcDiv>
          </QuestionListWrapDiv>
        )}
        {item.type === "드롭다운" &&
          item.items.map((item, index) => (
            <QuestionItemLi key={index}>
              <QuestionListNumberSpan>{index + 1}</QuestionListNumberSpan>
              <QuestionItemP>{item}</QuestionItemP>
            </QuestionItemLi>
          ))}
      </ul>
    </QuestionItemWrap>
  );
}
