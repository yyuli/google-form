import React, { useEffect, useState } from "react";
import square from "../../assets/images/square.svg";
import circle from "../../assets/images/circle.svg";
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
  QuestionDragBtn,
  QuestionListEtcDiv,
  QuestionListInput,
  QuestionListShortInput,
  QuestionListLongInput,
  QuestionListNumberSpan,
} from "../QuestionBox/QuestionBoxStyle";
import { useSelector, useDispatch } from "react-redux";
import { setIndex } from "../../store/clickedIndexSlice";
import QuestionBox from "../QuestionBox/QuestionBox";

export default function QuestionItem({ item, index, items, setItems }) {
  const [isQuestionItemHovered, setIsQuestionItemHovered] = useState(false);
  const [isModified, setIsModified] = useState(false);
  const clickedIndex = useSelector((state) => state.clickedIndex.value);
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(setIndex(index));
  };
  useEffect(() => {
    if (index === clickedIndex) {
      setIsModified(true);
    } else {
      setIsModified(false);
    }
  }, [clickedIndex]);
  return (
    <>
      {isModified || items.length === 1 ? (
        <QuestionBox
          item={item}
          items={items}
          setItems={setItems}
          index={index}
        />
      ) : (
        <QuestionItemWrap
          onMouseEnter={() => setIsQuestionItemHovered(true)}
          onMouseLeave={() => setIsQuestionItemHovered(false)}
          onClick={handleClick}
        >
          <QuestionItemDragDiv>
            {isQuestionItemHovered && <QuestionDragBtn />}
          </QuestionItemDragDiv>
          <QuestionItemTitle>
            {item.title === "" ? "질문" : item.title}
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
                  <QuestionListInput
                    type="text"
                    placeholder="기타..."
                    readOnly
                  />
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
                  <QuestionListInput
                    type="text"
                    placeholder="기타..."
                    readOnly
                  />
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
      )}
    </>
  );
}
