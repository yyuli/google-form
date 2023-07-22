import React, { useState } from "react";
import TitleBox from "../../components/TitleBox/TitleBox";
import { useSelector } from "react-redux";
import {
  QuestionItemWrap,
  QuestionItemDragDiv,
  QuestionItemTitle,
  QuestionItemLi,
  QuestionListWrapDiv,
  QuestionItemRequiredSpan,
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
  AnimatedPreviewShortSpan,
  AnimatePreviewShortDiv,
  PreviewShortInput,
  AnimatedPreviewLongSpan,
  AnimatePreviewLongDiv,
  PreviewLongInput,
  BtnWrap,
  SubmitBtn,
  ResetBtn,
} from "./PreviewStyle";

export default function Preview() {
  const questionListItem = useSelector((state) => state.questionListItem.value);
  const [isActive, setIsActive] = useState(false);
  const [selectedOption, setSelectedOption] = useState("선택");
  const [checked, setChecked] = useState(false);
  const handleCheckboxEtcClick = () => {
    setChecked(!checked);
  };
  const [checkedRadio, setCheckedRadio] = useState(false);
  const handleCheckboxEtcClickRadio = () => {
    setCheckedRadio(!checkedRadio);
  };
  const randomId = () => {
    return "_" + Math.random().toString(36).substring(2, 9);
  };

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
                    checked={checkedRadio}
                  />
                  <PreviewEtcDiv>
                    <PreviewEtcLabel
                      htmlFor="radio-etc"
                      onClick={handleCheckboxEtcClickRadio}
                    >
                      기타:
                    </PreviewEtcLabel>
                    <AnimatePreviewEtcDiv>
                      <PreviewEtcInput
                        type="text"
                        onClick={handleCheckboxEtcClickRadio}
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
      <BtnWrap>
        <SubmitBtn type="submit">제출</SubmitBtn>
        <ResetBtn type="button">양식 지우기</ResetBtn>
      </BtnWrap>
    </>
  );
}
