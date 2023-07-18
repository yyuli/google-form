import React, { useState } from "react";
import circle from "../../assets/images/circle.svg";
import copy from "../../assets/images/copy.svg";
import trash from "../../assets/images/trash.svg";
import { SelectedBoxLeftColor } from "../../components/TitleBox/TitleBoxStyle";
import {
  QuestionBoxWrap,
  QuestionDragBtn,
  QuestionTitleSection,
  AnimatedQuestionTitleSpan,
  AnimateQuestionTitleDiv,
  QuestionTitleInput,
  QuestionTypeSelect,
  QuestionListSection,
  QuestionListDragBtn,
  AnimatedQuestionListSpan,
  AnimateQuestionListDiv,
  QuestionListInput,
  QuestionListRemoveBtn,
  QuestionListAddInput,
  QuestionListDiv,
  QuestionListSpan,
  QuestionListAddBtn,
  QuestionListIconDiv,
  QuestionListIconBtn,
  QuestionListLineSpan,
  ToggleRequiredSpan,
  ToggleSwitchDiv,
  ToggleButtonSpan,
} from "./QuestionBoxStyle";

export default function QuestionBox() {
  const [isActiveTypeSelect, setIsActiveTypeSelect] = useState(false);
  const [isActiveToggleSwitch, setIsActiveToggleSwitch] = useState(false);
  const [questionTitle, setQuestionTitle] = useState("제목 없는 질문");
  const [questionItem, setQuestionItem] = useState("옵션 1");
  const [isQuestionListInputHovered, setIsQuestionListInputHovered] =
    useState(false);
  const handleQuestionTitleChange = (e) => {
    setQuestionTitle(e.target.value);
  };
  const handleQuestionItem = (e) => {
    setQuestionItem(e.target.value);
  };
  return (
    <QuestionBoxWrap>
      <h2 className="a11y-hidden">질문</h2>
      <QuestionDragBtn />
      <SelectedBoxLeftColor />
      <QuestionTitleSection>
        <AnimateQuestionTitleDiv>
          <QuestionTitleInput
            type="text"
            placeholder="질문"
            value={questionTitle}
            onChange={handleQuestionTitleChange}
          />
          <AnimatedQuestionTitleSpan />
        </AnimateQuestionTitleDiv>
        <QuestionTypeSelect
          onClick={() => setIsActiveTypeSelect(!isActiveTypeSelect)}
          className={isActiveTypeSelect ? "active" : ""}
        >
          <button type="button">객관식 질문</button>
          <ul>
            <li>
              <button type="button">단답형</button>
            </li>
            <li>
              <button type="button">장문형</button>
            </li>
            <li>
              <button type="button">객관식 질문</button>
            </li>
            <li>
              <button type="button">체크박스</button>
            </li>
            <li>
              <button type="button">드롭다운</button>
            </li>
          </ul>
        </QuestionTypeSelect>
      </QuestionTitleSection>
      <QuestionListSection>
        <QuestionListDiv
          onMouseEnter={() => setIsQuestionListInputHovered(true)}
          onMouseLeave={() => setIsQuestionListInputHovered(false)}
        >
          {isQuestionListInputHovered && <QuestionListDragBtn />}
          <img src={circle} alt="빈 라디오 버튼"></img>
          <AnimateQuestionListDiv>
            <QuestionListInput
              type="text"
              value={questionItem}
              onChange={handleQuestionItem}
            />
            <AnimatedQuestionListSpan />
          </AnimateQuestionListDiv>
          <QuestionListRemoveBtn />
        </QuestionListDiv>
        <QuestionListDiv>
          <img src={circle} alt="빈 라디오 버튼"></img>
          <QuestionListAddInput placeholder="옵션 추가" />
          <QuestionListSpan>또는</QuestionListSpan>
          <QuestionListAddBtn>'기타' 추가</QuestionListAddBtn>
        </QuestionListDiv>
        <QuestionListIconDiv>
          <QuestionListIconBtn>
            <img src={copy} alt="복사 버튼" />
          </QuestionListIconBtn>
          <QuestionListIconBtn>
            <img src={trash} alt="삭제 버튼" />
          </QuestionListIconBtn>
          <QuestionListLineSpan />
          <ToggleRequiredSpan
            onClick={() => setIsActiveToggleSwitch(!isActiveToggleSwitch)}
          >
            필수
          </ToggleRequiredSpan>
          <ToggleSwitchDiv
            onClick={() => setIsActiveToggleSwitch(!isActiveToggleSwitch)}
            className={isActiveToggleSwitch ? "active" : ""}
          >
            <ToggleButtonSpan />
          </ToggleSwitchDiv>
        </QuestionListIconDiv>
      </QuestionListSection>
    </QuestionBoxWrap>
  );
}
