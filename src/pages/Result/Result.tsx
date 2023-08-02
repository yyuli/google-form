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
import { RootState } from "../../store/store";

export default function Result() {
  const questionListItem = useSelector(
    (state: RootState) => state.questionListItem.value
  );
  const location = useLocation();
  const inputValues = location?.state?.inputValues || {};
  const selectedOption = location?.state?.selectedOption || {};
  return (
    <>
      <h1 className="a11y-hidden">구글 설문지</h1>
      <TitleBox disabled result />
      {questionListItem.map((item, index) => {
        return (
          <QuestionItemWrap key={index}>
            <QuestionItemDragDiv />
            <QuestionItemTitle
              title={item.title === "" && !item.required ? "false" : "true"}
            >
              {item.title}
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
                {item.items.map((item, optionIdx) => {
                  const checkboxValue =
                    (inputValues.checkRadio &&
                      inputValues.checkRadio[index][optionIdx]) ||
                    false;
                  return (
                    <QuestionItemLi key={optionIdx}>
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
                <PreviewCustomRadio
                  type="checkbox"
                  value={
                    (inputValues.checkedRadioEtc &&
                      inputValues.checkedRadioEtc[index]) ||
                    false
                  }
                  checked={
                    (inputValues.checkedRadioEtc &&
                      inputValues.checkedRadioEtc[index]) ||
                    false
                  }
                  readOnly
                />
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
                {item.items.map((item, optionIdx) => {
                  const checkboxValue =
                    (inputValues.checkBox &&
                      inputValues.checkBox[index][optionIdx]) ||
                    false;
                  return (
                    <QuestionItemLi key={optionIdx}>
                      <PreviewCustomInput
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
            {item.type === "체크박스" && item.etc && (
              <QuestionListWrapDiv>
                <PreviewCustomInput
                  type="checkbox"
                  value={
                    (inputValues.checkedBoxEtc &&
                      inputValues.checkedBoxEtc[index]) ||
                    false
                  }
                  checked={
                    (inputValues.checkedBoxEtc &&
                      inputValues.checkedBoxEtc[index]) ||
                    false
                  }
                  readOnly
                />
                <PreviewEtcDiv>
                  <PreviewEtcLabel>기타:</PreviewEtcLabel>
                  <PreviewEtcInput
                    type="text"
                    value={
                      (inputValues.checkboxEtc &&
                        inputValues.checkboxEtc[index]) ||
                      ""
                    }
                    readOnly
                  />
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
