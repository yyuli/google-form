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
  QuestionListEtcDiv,
  QuestionListInput,
  QuestionListRemoveBtn,
  QuestionListAddInput,
  QuestionListDiv,
  QuestionListAddDiv,
  QuestionListSpan,
  QuestionListAddBtn,
  QuestionListIconDiv,
  QuestionListIconBtn,
  QuestionListLineSpan,
  ToggleRequiredSpan,
  ToggleSwitchDiv,
  ToggleButtonSpan,
} from "./QuestionBoxStyle";
import NavigationBox from "../NavigationBox/NavigationBox";
import QuestionItem from "../QuestionItem/QuestionItem";

export default function QuestionBox() {
  const [isActiveTypeSelect, setIsActiveTypeSelect] = useState(false);
  const [isActiveToggleSwitch, setIsActiveToggleSwitch] = useState(false);
  const [questionTitle, setQuestionTitle] = useState("제목 없는 질문");
  const [questionItem, setQuestionItem] = useState("옵션 1");
  const [items, setItems] = useState([]);
  const [options, setOptions] = useState([questionItem]);
  const [hoverState, setHoverState] = useState(options.map(() => false));
  const [showEtcOption, setShowEtcOption] = useState(false);
  const handleQuestionTitleChange = (e) => {
    setQuestionTitle(e.target.value);
  };
  const handleQuestionItem = (e, index) => {
    const newOptions = [...options];
    newOptions[index] = e.target.value;
    setOptions(newOptions);
  };
  const addItem = () => {
    const newItem = {
      title: questionTitle,
      items: [...options],
    };
    setItems([...items, newItem]);
  };
  const addOption = () => {
    const newOption = `옵션 ${options.length + 1}`;
    setOptions([...options, newOption]);
  };
  const removeOption = (index) => {
    const removedOption = [...options];
    removedOption.splice(index, 1);
    setOptions(removedOption);
  };
  const handleMouseEnter = (index) => {
    setHoverState((prev) => prev.map((_, i) => (i === index ? true : false)));
  };
  const handleMouseLeave = (index) => {
    setHoverState(options.map(() => false));
  };
  const handleShowEtc = (state) => {
    setShowEtcOption(state);
  };
  return (
    <>
      {items.map((item, index) => (
        <QuestionItem key={index} item={item} />
      ))}
      <QuestionBoxWrap>
        <NavigationBox addItem={addItem} />
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
          {options.map((option, index) => (
            <QuestionListDiv
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={() => handleMouseLeave(index)}
              key={index}
            >
              {hoverState[index] && <QuestionListDragBtn />}
              <img src={circle} alt="빈 라디오 버튼" />
              <AnimateQuestionListDiv>
                <QuestionListInput
                  type="text"
                  value={option}
                  onChange={(e) => handleQuestionItem(e, index)}
                />
                <AnimatedQuestionListSpan />
              </AnimateQuestionListDiv>
              {options.length === 1 ? null : (
                <QuestionListRemoveBtn onClick={() => removeOption(index)} />
              )}
            </QuestionListDiv>
          ))}
          {showEtcOption && (
            <QuestionListDiv>
              <img src={circle} alt="빈 라디오 버튼" />
              <QuestionListEtcDiv>
                <QuestionListInput type="text" placeholder="기타..." readOnly />
              </QuestionListEtcDiv>
              {options.length === 0 ? null : (
                <QuestionListRemoveBtn onClick={() => handleShowEtc(false)} />
              )}
            </QuestionListDiv>
          )}
          <QuestionListAddDiv>
            <img src={circle} alt="빈 라디오 버튼" />
            <QuestionListAddInput
              placeholder="옵션 추가"
              onClick={addOption}
              readOnly
            />
            {!showEtcOption && (
              <>
                <QuestionListSpan>또는</QuestionListSpan>
                <QuestionListAddBtn onClick={() => handleShowEtc(true)}>
                  '기타' 추가
                </QuestionListAddBtn>
              </>
            )}
          </QuestionListAddDiv>
          <QuestionListIconDiv>
            <QuestionListIconBtn onClick={addItem}>
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
    </>
  );
}
