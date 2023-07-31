import React, { useState } from "react";
import TitleBox from "../../components/TitleBox/TitleBox";
import { useSelector } from "react-redux";
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
  const [checkedSquare, setCheckedSquare] = useState(
    new Array(
      questionListItem.filter(
        (item) => item.type === "체크박스" && item.etc
      ).length
    ).fill(false)
  );
  const [checkedRadio, setCheckedRadio] = useState(
    new Array(
      questionListItem.filter(
        (item) => item.type === "객관식 질문" && item.etc
      ).length
    ).fill(false)
  );
  const handleCheckboxEtcClick = (index) => {
    const newCheckedSquare = [...checkedSquare];
    newCheckedSquare[index] = !newCheckedSquare[index];
    setCheckedSquare(newCheckedSquare);
  };
  const handleCheckboxEtcClickRadio = (index) => {
    const newCheckedRadio = [...checkedRadio];
    newCheckedRadio[index] = !newCheckedRadio[index];
    setCheckedRadio(newCheckedRadio);
  };
  const randomId = () => {
    return "_" + Math.random().toString(36).substring(2, 9);
  };
  const reset = () => {
    setSelectedOption("선택");
  };
  return (
    <>
      <h1 className="a11y-hidden">구글 설문지</h1>
      <TitleBox disabled></TitleBox>
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
            {item.type === "객관식 질문" && (
              <ul>
                {item.items.map((item, index) => {
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
              </ul>
            )}
            {item.type === "객관식 질문" && item.etc && (
              <QuestionListWrapDiv>
                <PreviewCustomRadio
                  type="checkbox"
                  checked={checkedRadio[index]}
                  onChange={() => handleCheckboxEtcClickRadio(index)}
                />
                <PreviewEtcDiv>
                  <PreviewEtcLabel
                    onClick={() => handleCheckboxEtcClickRadio(index)}
                  >
                    기타:
                  </PreviewEtcLabel>
                  <AnimatePreviewEtcDiv>
                    <PreviewEtcInput
                      type="text"
                      onClick={() => handleCheckboxEtcClickRadio(index)}
                    />
                    <AnimatedPreviewEtcSpan />
                  </AnimatePreviewEtcDiv>
                </PreviewEtcDiv>
              </QuestionListWrapDiv>
            )}
            {item.type === "체크박스" && (
              <ul>
                {item.items.map((item, index) => {
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
              </ul>
            )}
            {item.type === "체크박스" && item.etc && (
              <QuestionListWrapDiv>
                <PreviewCustomInput
                  type="checkbox"
                  checked={checkedSquare[index]}
                  onChange={() => handleCheckboxEtcClick(index)}
                />
                <PreviewEtcDiv>
                  <PreviewEtcLabel
                    onClick={() => handleCheckboxEtcClick(index)}
                  >
                    기타:
                  </PreviewEtcLabel>
                  <AnimatePreviewEtcDiv>
                    <PreviewEtcInput
                      type="text"
                      onClick={() => handleCheckboxEtcClick(index)}
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
        <ResetBtn type="button" onClick={reset}>
          양식 지우기
        </ResetBtn>
      </BtnWrap>
    </>
  );
}
