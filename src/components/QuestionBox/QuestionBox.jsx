import React, { useState, useEffect } from "react";
import circle from "../../assets/images/circle.svg";
import square from "../../assets/images/square.svg";
import copy from "../../assets/images/copy.svg";
import trash from "../../assets/images/trash.svg";
import { SelectedBoxLeftColor } from "../TitleBox/TitleBoxStyle";
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
} from "./QuestionBoxStyle";
import NavigationBox from "../NavigationBox/NavigationBox";
import { useSelector, useDispatch } from "react-redux";
import { increment, decrement } from "../../store/clickedIndexSlice";
import { setSelectedBox } from "../../store/selectedBoxSlice";
import {
  initialState,
  setQuestionListItem,
} from "../../store/questionListItemSlice";
import { useNavigate } from "react-router-dom";

export default function QuestionBox({ item, index }) {
  const [isActiveTypeSelect, setIsActiveTypeSelect] = useState(false);
  const [isActiveToggleSwitch, setIsActiveToggleSwitch] = useState(false);
  const [questionTitle, setQuestionTitle] = useState(item.title);
  const [questionItem, setQuestionItem] = useState(item.items);
  const [options, setOptions] = useState([...item.items]);
  const [hoverState, setHoverState] = useState(options.map(() => false));
  const [showEtcOption, setShowEtcOption] = useState(item.etc);
  const [selectedQuestionType, setSelectedQuestionType] = useState(item.type);
  const selectedBox = useSelector((state) => state.selectedBox.value);
  const questionListItem = useSelector((state) => state.questionListItem.value);
  const [isEdited, setIsEdited] = useState(false);

  const handleQuestionTitleChange = (e) => {
    setQuestionTitle(e.target.value);
    setIsEdited(true);
  };
  const handleQuestionItem = (e, index) => {
    const newOptions = [...options];
    newOptions[index] = e.target.value;
    setOptions(newOptions);
    setIsEdited(true);
  };
  const dispatch = useDispatch();
  const addItem = () => {
    const addItems = {
      title: questionTitle,
      items: [...options],
      etc: showEtcOption,
      type: selectedQuestionType,
      required: isActiveToggleSwitch,
    };
    const newItems = [
      ...questionListItem.slice(0, index),
      addItems,
      ...initialState.value,
      ...questionListItem.slice(index + 1),
    ];
    dispatch(setQuestionListItem(newItems));
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
      ...questionListItem.slice(0, index),
      copiedItem,
      ...questionListItem.slice(index),
    ];
    dispatch(setQuestionListItem(newItems));
  };
  const removeItem = () => {
    if (questionListItem.length - 1 === index) {
      dispatch(decrement());
    }
    const newItems = [
      ...questionListItem.slice(0, index),
      ...questionListItem.slice(index + 1),
    ];
    dispatch(setQuestionListItem(newItems));
  };
  useEffect(() => {
    setQuestionTitle(item.title);
    setSelectedQuestionType(item.type);
    setOptions([...item.items]);
    setShowEtcOption(item.etc);
  }, [questionListItem]);

  const addOption = () => {
    const newOption = `옵션 ${options.length + 1}`;
    setOptions([...options, newOption]);
    setIsEdited(true);
  };
  const removeOption = (index) => {
    const removedOption = [...options];
    removedOption.splice(index, 1);
    setOptions(removedOption);
    setIsEdited(true);
  };
  const handleMouseEnter = (index) => {
    setHoverState((prev) => prev.map((_, i) => (i === index ? true : false)));
  };
  const handleMouseLeave = (index) => {
    setHoverState(options.map(() => false));
  };
  const handleShowEtc = (state) => {
    setShowEtcOption(state);
    setIsEdited(true);
  };
  const handleClick = (type) => {
    setSelectedQuestionType(type);
    setIsActiveTypeSelect(!isActiveTypeSelect);
    setIsEdited(true);
  };
  const navigate = useNavigate();
  const handlePreview = () => {
    navigate("/preview");
  };
  const questionTypes = [
    { name: "단답형", id: "short" },
    { name: "장문형", id: "long" },
    { name: "객관식 질문", id: "multi" },
    { name: "체크박스", id: "check" },
    { name: "드롭다운", id: "drop" },
  ];
  const editItem = () => {
    const editItems = {
      title: questionTitle,
      items: [...options],
      etc: showEtcOption,
      type: selectedQuestionType,
      required: isActiveToggleSwitch,
    };
    const newItems = [
      ...questionListItem.slice(0, index),
      editItems,
      ...questionListItem.slice(index + 1),
    ];
    dispatch(setQuestionListItem(newItems));
  };
  useEffect(() => {
    if (isEdited) {
      editItem();
      setIsEdited(false);
    }
  }, [isEdited]);
  return (
    <>
      <QuestionBoxWrap
        onClick={() => {
          dispatch(setSelectedBox("QuestionBox"));
        }}
      >
        <NavigationBox addItem={addItem} handlePreview={handlePreview} />
        <h2 className="a11y-hidden">설문지 작성칸</h2>
        <QuestionDragBtn />
        {selectedBox === "QuestionBox" ? <SelectedBoxLeftColor /> : null}
        <QuestionTitleSection>
          <h3 className="a11y-hidden">설문지 질문</h3>
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
          <h3 className="a11y-hidden">설문지 내용</h3>
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
            options.map((item, index) => (
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
          {selectedQuestionType === "객관식 질문" && showEtcOption && (
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
          {selectedQuestionType === "객관식 질문" && (
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
          )}
          {selectedQuestionType === "체크박스" &&
            options.map((item, index) => (
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
          {selectedQuestionType === "체크박스" && showEtcOption && (
            <QuestionListDiv>
              <img src={square} alt="빈 체크박스 버튼" />
              <QuestionListEtcDiv>
                <QuestionListInput type="text" placeholder="기타..." readOnly />
              </QuestionListEtcDiv>
              {options.length === 0 ? null : (
                <QuestionListRemoveBtn onClick={() => handleShowEtc(false)} />
              )}
            </QuestionListDiv>
          )}
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
            options.map((item, index) => (
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
              onClick={() => {
                setIsActiveToggleSwitch(!isActiveToggleSwitch);
                setIsEdited(true);
              }}
            >
              필수
            </ToggleRequiredSpan>
            <ToggleSwitchDiv
              onClick={() => {
                setIsActiveToggleSwitch(!isActiveToggleSwitch);
                setIsEdited(true);
              }}
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
