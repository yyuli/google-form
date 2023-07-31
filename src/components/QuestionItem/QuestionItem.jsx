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
  QuestionListEtcDiv,
  QuestionListInput,
  QuestionListShortInput,
  QuestionListLongInput,
  QuestionListNumberSpan,
} from "../QuestionBox/QuestionBoxStyle";
import { useSelector, useDispatch } from "react-redux";
import { setIndex } from "../../store/clickedIndexSlice";
import QuestionBox from "../QuestionBox/QuestionBox";
import { Draggable } from "react-beautiful-dnd";

export default function QuestionItem({ item, index }) {
  const [isQuestionItemHovered, setIsQuestionItemHovered] = useState(false);
  const [isModified, setIsModified] = useState(false);
  const clickedIndex = useSelector((state) => state.clickedIndex.value);
  const questionListItem = useSelector((state) => state.questionListItem.value);
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
      <Draggable key={index} draggableId={`draggable-1-${index}`} index={index}>
        {(provided) => (
          <>
            {isModified || questionListItem.length === 1 ? (
              <QuestionBox item={item} index={index} provided={provided} />
            ) : (
              <QuestionItemWrap
                ref={provided.innerRef}
                {...provided.draggableProps}
                onMouseEnter={() => setIsQuestionItemHovered(true)}
                onMouseLeave={() => setIsQuestionItemHovered(false)}
                onClick={handleClick}
              >
                <QuestionItemDragDiv
                  {...provided.dragHandleProps}
                  isVisible={isQuestionItemHovered}
                />
                <QuestionItemTitle>
                  {item.title === "" ? "질문" : item.title}
                  {item.required && (
                    <QuestionItemRequiredSpan>*</QuestionItemRequiredSpan>
                  )}
                </QuestionItemTitle>
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
                {item.type === "객관식 질문" && (
                  <ul>
                    {item.items.map((item, index) => (
                      <QuestionItemLi key={index}>
                        <img src={circle} alt="빈 라디오 버튼" />
                        <QuestionItemP>{item}</QuestionItemP>
                      </QuestionItemLi>
                    ))}
                  </ul>
                )}
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
                {item.type === "체크박스" && (
                  <ul>
                    {item.items.map((item, index) => (
                      <QuestionItemLi key={index}>
                        <img src={square} alt="빈 체크박스 버튼" />
                        <QuestionItemP>{item}</QuestionItemP>
                      </QuestionItemLi>
                    ))}
                  </ul>
                )}
                {item.type === "체크박스" && item.etc && (
                  <QuestionListWrapDiv>
                    <img src={square} alt="빈 체크박스 버튼" />
                    <QuestionListEtcDiv>
                      <QuestionListInput
                        type="text"
                        placeholder="기타..."
                        readOnly
                      />
                    </QuestionListEtcDiv>
                  </QuestionListWrapDiv>
                )}
                {item.type === "드롭다운" && (
                  <ul>
                    {item.items.map((item, index) => (
                      <QuestionItemLi key={index}>
                        <QuestionListNumberSpan>
                          {index + 1}
                        </QuestionListNumberSpan>
                        <QuestionItemP>{item}</QuestionItemP>
                      </QuestionItemLi>
                    ))}
                  </ul>
                )}
              </QuestionItemWrap>
            )}
          </>
        )}
      </Draggable>
    </>
  );
}
