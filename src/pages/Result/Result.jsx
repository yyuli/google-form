import React from "react";
import TitleBox from "../../components/TitleBox/TitleBox";
import {
  QuestionItemWrap,
  QuestionItemTitle,
  QuestionItemLi,
  QuestionListWrapDiv,
  QuestionItemRequiredSpan,
  QuestionItemDragDiv,
} from "../../components/QuestionItem/QuestionItemStyle";
import { QuestionTypeSelect } from "../../components/QuestionBox/QuestionBoxStyle";
import {
  PreviewEtcDiv,
  PreviewEtcLabel,
  AnimatedPreviewEtcSpan,
  AnimatePreviewEtcDiv,
  PreviewEtcInput,
  PreviewCustomInput,
  PreviewCustomLabel,
  PreviewCustomRadio,
  AnimatePreviewShortDiv,
  PreviewShortInput,
  PreviewLongInput,
} from "../Preview/PreviewStyle";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

export default function Result() {
  const questionListItem = useSelector((state) => state.questionListItem.value);
  const location = useLocation();
  const inputValues = location?.state?.inputValues || {};
  const selectedOption = location?.state?.selectedOption || {};
  const keysCheckRadio = Object.keys(inputValues.checkRadio);
  const keysCheckBox = Object.keys(inputValues.checkbox);
  console.log(keysCheckRadio);
  console.log(keysCheckBox);
  console.log(inputValues);
  return (
    <>
      <TitleBox disabled result />
      {questionListItem.map((item, index) => {
        return (
          <QuestionItemWrap key={index}>
            <QuestionItemDragDiv />
            <QuestionItemTitle>
              {item.title === "" ? "질문" : item.title}
              {item.required && (
                <QuestionItemRequiredSpan>*</QuestionItemRequiredSpan>
              )}
            </QuestionItemTitle>
            {item.type === "단답형" && (
              <AnimatePreviewShortDiv>
                <PreviewShortInput
                  type="text"
                  placeholder="내 답변"
                  value={
                    (inputValues.shortAnswer &&
                      inputValues.shortAnswer[index]) ||
                    ""
                  }
                  readOnly
                />
              </AnimatePreviewShortDiv>
            )}
            {item.type === "장문형" && (
              <PreviewLongInput
                type="text"
                placeholder="내 답변"
                value={
                  (inputValues.longAnswer && inputValues.longAnswer[index]) ||
                  ""
                }
                readOnly
              />
            )}
            {item.type === "객관식 질문" && (
              <ul>
                {item.items.map((item, idx) => {
                  const checkboxValue =
                    (inputValues.checkRadio &&
                      inputValues.checkRadio[keysCheckRadio[index]]) ||
                    false;
                  return (
                    <QuestionItemLi key={idx}>
                      <PreviewCustomRadio
                        type="checkbox"
                        value={checkboxValue}
                        checked={checkboxValue}
                        readOnly
                      />
                      <PreviewCustomLabel>{item}</PreviewCustomLabel>
                    </QuestionItemLi>
                  );
                })}
              </ul>
            )}
            {item.type === "객관식 질문" && item.etc && (
              <QuestionListWrapDiv>
                <PreviewCustomRadio type="checkbox" />
                <PreviewEtcDiv>
                  <PreviewEtcLabel>기타:</PreviewEtcLabel>
                  <PreviewEtcInput
                    type="text"
                    value={
                      (inputValues.radioEtc && inputValues.radioEtc[index]) ||
                      ""
                    }
                    readOnly
                  />
                </PreviewEtcDiv>
              </QuestionListWrapDiv>
            )}
            {item.type === "체크박스" && (
              <ul>
                {item.items.map((item, index) => {
                  return (
                    <QuestionItemLi key={index}>
                      <PreviewCustomInput
                        type="checkbox"
                        value={
                          (inputValues.checkbox &&
                            inputValues.checkbox[keysCheckBox[index]]) ||
                          false
                        }
                      />
                      <PreviewCustomLabel>{item}</PreviewCustomLabel>
                    </QuestionItemLi>
                  );
                })}
              </ul>
            )}
            {item.type === "체크박스" && item.etc && (
              <QuestionListWrapDiv>
                <PreviewCustomInput type="checkbox" />
                <PreviewEtcDiv>
                  <PreviewEtcLabel>기타:</PreviewEtcLabel>
                  <AnimatePreviewEtcDiv>
                    <PreviewEtcInput
                      type="text"
                      value={
                        (inputValues.checkboxEtc &&
                          inputValues.checkboxEtc[index]) ||
                        ""
                      }
                    />
                    <AnimatedPreviewEtcSpan />
                  </AnimatePreviewEtcDiv>
                </PreviewEtcDiv>
              </QuestionListWrapDiv>
            )}
            {item.type === "드롭다운" && (
              <QuestionTypeSelect>
                <button type="button">
                  {(selectedOption && selectedOption[index]) || "선택"}
                </button>
                <ul>
                  {item.items.map((item, idx) => (
                    <li key={idx}>
                      <button type="button">{item}</button>
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
