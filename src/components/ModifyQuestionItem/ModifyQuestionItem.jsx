import React, { useState, useRef, useEffect } from "react";
import circle from "../../assets/images/circle.svg";
import square from "../../assets/images/square.svg";
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
  QuestionListNumberSpan,
  AnimatedQuestionListSpan,
  AnimateQuestionListDiv,
  QuestionListEtcDiv,
  QuestionListInput,
  QuestionListShortInput,
  QuestionListLongInput,
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
} from "../QuestionBox/QuestionBoxStyle";
import NavigationBox from "../NavigationBox/NavigationBox";
import { useDispatch } from "react-redux";
import { increment } from "../../store/clickSlice";

export default function ModifyQuestionItem({ item, items, setItems, index }) {
  const [isActiveTypeSelect, setIsActiveTypeSelect] = useState(false);
  const [isActiveToggleSwitch, setIsActiveToggleSwitch] = useState(false);
  const [questionTitle, setQuestionTitle] = useState("제목 없는 질문");
  const [questionItem, setQuestionItem] = useState("옵션 1");
  const [options, setOptions] = useState([questionItem]);
  const [hoverState, setHoverState] = useState(options.map(() => false));
  const [showEtcOption, setShowEtcOption] = useState(false);
  const [selectedQuestionType, setSelectedQuestionType] = useState(item.type);
  const dispatch = useDispatch();
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
      etc: showEtcOption,
      type: selectedQuestionType,
      required: isActiveToggleSwitch,
    };
    setItems([...items, newItem]);
    setShowEtcOption(false);
    setOptions([questionItem]);
    setQuestionTitle("");
    setSelectedQuestionType("객관식 질문");
    dispatch(increment());
  };
  const copyItem = () => {
    const copiedItem = {
      title: item.title,
      items: [...item.items],
      etc: item.etc,
      type: item.type,
      required: item.required,
    };
    dispatch(increment());
    const newItems = [
      ...items.slice(0, index),
      copiedItem,
      ...items.slice(index),
    ];
    setItems(newItems);
  };
  const removeItem = () => {
    dispatch(increment());
    const newItems = [...items.slice(0, index), ...items.slice(index + 1)];
    setItems(newItems);
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
  const handleClick = (type) => {
    setSelectedQuestionType(type);
    setIsActiveTypeSelect(!isActiveTypeSelect);
  };
  const title = useRef();
  useEffect(() => {
    title.current.value = item.title;
  }, []);

  const questionTypes = [
    { name: "단답형", id: "short" },
    { name: "장문형", id: "long" },
    { name: "객관식 질문", id: "multi" },
    { name: "체크박스", id: "check" },
    { name: "드롭다운", id: "drop" },
  ];
  return (
    <>
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
              ref={title}
              onChange={handleQuestionTitleChange}
            />
            <AnimatedQuestionTitleSpan />
          </AnimateQuestionTitleDiv>
          <QuestionTypeSelect
            onClick={() => setIsActiveTypeSelect(!isActiveTypeSelect)}
            className={isActiveTypeSelect ? "active" : ""}
          >
            <button type="button">{selectedQuestionType}</button>
            <ul>
              {questionTypes.map((type) => (
                <li key={type.id}>
                  <button type="button" onClick={() => handleClick(type.name)}>
                    {type.name}
                  </button>
                </li>
              ))}
            </ul>
          </QuestionTypeSelect>
        </QuestionTitleSection>
        <QuestionListSection>
          {selectedQuestionType === "단답형" && (
            <QuestionListShortInput
              type="text"
              placeholder="단답형 텍스트"
              readOnly
            />
          )}
          {selectedQuestionType === "장문형" && (
            <QuestionListLongInput
              type="text"
              placeholder="장문형 텍스트"
              readOnly
            />
          )}
          {selectedQuestionType === "객관식 질문" &&
            item.items.map((item, index) => (
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
                    value={item}
                    onChange={(e) => handleQuestionItem(e, index)}
                  />
                  <AnimatedQuestionListSpan />
                </AnimateQuestionListDiv>
                {options.length === 1 ? null : (
                  <QuestionListRemoveBtn onClick={() => removeOption(index)} />
                )}
              </QuestionListDiv>
            ))}
          {(selectedQuestionType === "객관식 질문" && showEtcOption) ||
            (item.type === "객관식 질문" && item.etc && (
              <QuestionListDiv>
                <img src={circle} alt="빈 라디오 버튼" />
                <QuestionListEtcDiv>
                  <QuestionListInput
                    type="text"
                    placeholder="기타..."
                    readOnly
                  />
                </QuestionListEtcDiv>
                {options.length === 0 ? null : (
                  <QuestionListRemoveBtn onClick={() => handleShowEtc(false)} />
                )}
              </QuestionListDiv>
            ))}
          {selectedQuestionType === "객관식 질문" && (
            <QuestionListAddDiv>
              <img src={circle} alt="빈 라디오 버튼" />
              <QuestionListAddInput
                placeholder="옵션 추가"
                onClick={addOption}
                readOnly
              />
              {!item.etc && !showEtcOption && (
                <>
                  <QuestionListSpan>또는</QuestionListSpan>
                  <QuestionListAddBtn onClick={() => handleShowEtc(true)}>
                    '기타' 추가
                  </QuestionListAddBtn>
                </>
              )}
            </QuestionListAddDiv>
          )}
          {selectedQuestionType === "체크박스" &&
            item.items.map((item, index) => (
              <QuestionListDiv
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={() => handleMouseLeave(index)}
                key={index}
              >
                {hoverState[index] && <QuestionListDragBtn />}
                <img src={square} alt="빈 체크박스 버튼" />
                <AnimateQuestionListDiv>
                  <QuestionListInput
                    type="text"
                    value={item}
                    onChange={(e) => handleQuestionItem(e, index)}
                  />
                  <AnimatedQuestionListSpan />
                </AnimateQuestionListDiv>
                {options.length === 1 ? null : (
                  <QuestionListRemoveBtn onClick={() => removeOption(index)} />
                )}
              </QuestionListDiv>
            ))}
          {(selectedQuestionType === "체크박스" && showEtcOption) ||
            (item.type === "체크박스" && item.etc && (
              <QuestionListDiv>
                <img src={square} alt="빈 체크박스 버튼" />
                <QuestionListEtcDiv>
                  <QuestionListInput
                    type="text"
                    placeholder="기타..."
                    readOnly
                  />
                </QuestionListEtcDiv>
                {options.length === 0 ? null : (
                  <QuestionListRemoveBtn onClick={() => handleShowEtc(false)} />
                )}
              </QuestionListDiv>
            ))}
          {selectedQuestionType === "체크박스" && (
            <QuestionListAddDiv>
              <img src={square} alt="빈 체크박스 버튼" />
              <QuestionListAddInput
                placeholder="옵션 추가"
                onClick={addOption}
                readOnly
              />
              {!item.etc && !showEtcOption && (
                <>
                  <QuestionListSpan>또는</QuestionListSpan>
                  <QuestionListAddBtn onClick={() => handleShowEtc(true)}>
                    '기타' 추가
                  </QuestionListAddBtn>
                </>
              )}
            </QuestionListAddDiv>
          )}
          {selectedQuestionType === "드롭다운" &&
            item.items.map((item, index) => (
              <QuestionListDiv
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={() => handleMouseLeave(index)}
                key={index}
              >
                {hoverState[index] && <QuestionListDragBtn />}
                <QuestionListNumberSpan>{index + 1}</QuestionListNumberSpan>
                <AnimateQuestionListDiv>
                  <QuestionListInput
                    type="text"
                    value={item}
                    onChange={(e) => handleQuestionItem(e, index)}
                  />
                  <AnimatedQuestionListSpan />
                </AnimateQuestionListDiv>
                {options.length === 1 ? null : (
                  <QuestionListRemoveBtn onClick={() => removeOption(index)} />
                )}
              </QuestionListDiv>
            ))}
          {selectedQuestionType === "드롭다운" && (
            <QuestionListAddDiv>
              <QuestionListNumberSpan>
                {item.items.length + 1}
              </QuestionListNumberSpan>
              <QuestionListAddInput
                placeholder="옵션 추가"
                onClick={addOption}
                readOnly
              />
            </QuestionListAddDiv>
          )}
          <QuestionListIconDiv>
            <QuestionListIconBtn>
              <img src={copy} alt="복사 버튼" onClick={copyItem} />
            </QuestionListIconBtn>
            <QuestionListIconBtn onClick={() => removeItem()}>
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
              className={isActiveToggleSwitch || item.required ? "active" : ""}
            >
              <ToggleButtonSpan />
            </ToggleSwitchDiv>
          </QuestionListIconDiv>
        </QuestionListSection>
      </QuestionBoxWrap>
    </>
  );
}
