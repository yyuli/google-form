import React, { useState } from "react";
import TitleBox from "../../components/TitleBox/TitleBox";
import QuestionList from "../../components/QuestionList/QuestionList";
import { useSelector } from "react-redux";
import square from "../../assets/images/square.svg";
import squareChecked from "../../assets/images/square-checked.svg";
import circle from "../../assets/images/circle.svg";
import circleChecked from "../../assets/images/circle-checked.svg";
import {
  QuestionItemWrap,
  QuestionItemDragDiv,
  QuestionItemTitle,
  QuestionItemLi,
  QuestionItemP,
  QuestionListWrapDiv,
  QuestionItemRequiredSpan,
} from "../../components/QuestionItem/QuestionItemStyle";
import {
  QuestionDragBtn,
  QuestionListEtcDiv,
  QuestionListInput,
  QuestionListShortInput,
  QuestionListLongInput,
  QuestionListNumberSpan,
  QuestionTypeSelect,
} from "../../components/QuestionBox/QuestionBoxStyle";
import styled, { css } from "styled-components";
import {
  ExpandBorderBottom,
  CommonSpan,
} from "../../components/TitleBox/TitleBoxStyle";

const PreviewEtcDiv = styled(QuestionListEtcDiv)`
  display: flex;
  align-items: center;
`;
const PreviewEtcLabel = styled.label`
  display: block;
  font-size: 14px;
  width: 32px;
  margin-right: 20px;
`;
const AnimatedPreviewEtcSpan = styled.span`
  ${CommonSpan}
  bottom: 0;
`;
const AnimatePreviewEtcDiv = styled.div`
  position: relative;
  width: 593px;
  height: 24px;
`;
const PreviewEtcInput = styled(QuestionListInput)`
  border-bottom: 1px solid #0000001f;
  font-size: 16px;
  height: 24px;
  &:focus + ${AnimatedPreviewEtcSpan} {
    animation: ${ExpandBorderBottom} 0.4s forwards;
  }
`;
const CommonCustom = css`
  appearance: none;
  width: 20px;
  height: 20px;
  margin: 0;
  vertical-align: middle;
  transition: all 0.3s;
`;
const PreviewCustomInput = styled.input`
  ${CommonCustom}
  background: url(${square}) no-repeat center / 90%;
  &:checked {
    background-image: url(${squareChecked});
  }
`;
const PreviewCustomLabel = styled.label`
  font-size: 14px;
  margin-left: 10px;
`;
const PreviewCustomRadio = styled.input`
  ${CommonCustom}
  background: url(${circle}) no-repeat center / 90%;
  &:checked {
    background-image: url(${circleChecked});
  }
`;
const AnimatedPreviewShortSpan = styled.span`
  ${CommonSpan}
  bottom: 0;
`;
const AnimatePreviewShortDiv = styled.div`
  position: relative;
  width: 360px;
  height: 24px;
`;
const PreviewShortInput = styled(QuestionListShortInput)`
  width: 100%;
  &:focus + ${AnimatedPreviewShortSpan} {
    animation: ${ExpandBorderBottom} 0.4s forwards;
  }
`;
const AnimatedPreviewLongSpan = styled.span`
  ${CommonSpan}
  bottom: 0;
`;
const AnimatePreviewLongDiv = styled.div`
  position: relative;
  width: 612px;
  height: 24px;
`;
const PreviewLongInput = styled(QuestionListLongInput)`
  width: 100%;
  &:focus + ${AnimatedPreviewLongSpan} {
    animation: ${ExpandBorderBottom} 0.4s forwards;
  }
`;

export default function Preview() {
  const questionListItem = useSelector((state) => state.questionListItem.value);
  console.log(questionListItem);
  const [isActive, setIsActive] = useState(false);
  const [selectedOption, setSelectedOption] = useState("선택");
  const [checked, setChecked] = useState(false);
  const handleCheckboxEtcClick = () => {
    setChecked(!checked);
  };
  const [checkedTemp, setCheckedTemp] = useState(false);
  const handleCheckboxEtcClickTemp = () => {
    setCheckedTemp(!checkedTemp);
  };
  const randomId = () => {
    return "_" + Math.random().toString(36).substring(2, 9);
  };
  console.log(randomId());

  return (
    <>
      <TitleBox disabled></TitleBox>
      {questionListItem
        .slice(0, questionListItem.length - 1)
        .map((item, index) => {
          return (
            <QuestionItemWrap key={index}>
              <QuestionItemDragDiv></QuestionItemDragDiv>
              <QuestionItemTitle>
                {item.title === "" ? "질문" : item.title}
                {item.required && (
                  <QuestionItemRequiredSpan>*</QuestionItemRequiredSpan>
                )}
              </QuestionItemTitle>
              {item.type === "단답형" && (
                <AnimatePreviewShortDiv>
                  <PreviewShortInput type="text" placeholder="내 답변" />
                  <AnimatedPreviewShortSpan />
                </AnimatePreviewShortDiv>
              )}
              {item.type === "장문형" && (
                <AnimatePreviewLongDiv>
                  <PreviewLongInput type="text" placeholder="내 답변" />
                  <AnimatedPreviewLongSpan />
                </AnimatePreviewLongDiv>
              )}
              {item.type === "객관식 질문" &&
                item.items.map((item, index) => {
                  const itemId = `${randomId()}`;
                  return (
                    <QuestionItemLi key={index}>
                      <PreviewCustomRadio type="checkbox" id={itemId} />
                      <PreviewCustomLabel htmlFor={itemId}>
                        {item}
                      </PreviewCustomLabel>
                    </QuestionItemLi>
                  );
                })}
              {item.type === "객관식 질문" && item.etc && (
                <QuestionListWrapDiv>
                  <PreviewCustomRadio
                    type="checkbox"
                    id="radio-etc"
                    checked={checkedTemp}
                  />
                  <PreviewEtcDiv>
                    <PreviewEtcLabel
                      htmlFor="radio-etc"
                      onClick={handleCheckboxEtcClickTemp}
                    >
                      기타:
                    </PreviewEtcLabel>
                    <AnimatePreviewEtcDiv>
                      <PreviewEtcInput
                        type="text"
                        onClick={handleCheckboxEtcClickTemp}
                      />
                      <AnimatedPreviewEtcSpan />
                    </AnimatePreviewEtcDiv>
                  </PreviewEtcDiv>
                </QuestionListWrapDiv>
              )}
              {item.type === "체크박스" &&
                item.items.map((item, index) => {
                  const itemId = `${randomId()}`;
                  return (
                    <QuestionItemLi key={index}>
                      <PreviewCustomInput type="checkbox" id={itemId} />
                      <PreviewCustomLabel htmlFor={itemId}>
                        {item}
                      </PreviewCustomLabel>
                    </QuestionItemLi>
                  );
                })}
              {item.type === "체크박스" && item.etc && (
                <QuestionListWrapDiv>
                  <PreviewCustomInput
                    type="checkbox"
                    id="checkbox-etc"
                    checked={checked}
                  />
                  <PreviewEtcDiv>
                    <PreviewEtcLabel
                      htmlFor="checkbox-etc"
                      onClick={handleCheckboxEtcClick}
                    >
                      기타:
                    </PreviewEtcLabel>
                    <AnimatePreviewEtcDiv>
                      <PreviewEtcInput
                        type="text"
                        onClick={handleCheckboxEtcClick}
                      />
                      <AnimatedPreviewEtcSpan />
                    </AnimatePreviewEtcDiv>
                  </PreviewEtcDiv>
                </QuestionListWrapDiv>
              )}
              {item.type === "드롭다운" && (
                <QuestionTypeSelect
                  onClick={() => setIsActive(!isActive)}
                  className={isActive ? "active" : ""}
                >
                  <button type="button">{selectedOption}</button>
                  <ul>
                    {item.items.map((item, index) => (
                      <li key={index}>
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedOption(item);
                            setIsActive(false);
                          }}
                        >
                          {item}
                        </button>
                      </li>
                    ))}
                  </ul>
                </QuestionTypeSelect>
              )}
            </QuestionItemWrap>
          );
        })}
    </>
  );
}
