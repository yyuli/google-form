import React, { useState, useEffect } from "react";
import circle from "../../assets/images/circle.svg";
import square from "../../assets/images/square.svg";
import copy from "../../assets/images/copy.svg";
import trash from "../../assets/images/trash.svg";
import { SelectedBoxLeftColor } from "../TitleBox/TitleBoxStyle";
import {
  QuestionBoxWrap,
  QuestionDragBtn,
  QuestionBoxDragDiv,
  QuestionTitleSection,
  AnimatedQuestionTitleSpan,
  AnimateQuestionTitleDiv,
  QuestionTitleInput,
  QuestionTypeSelect,
  QuestionListSection,
  QuestionListShortInput,
  QuestionListLongInput,
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
import QuestionDropItem from "../QuestionDropItem/QuestionDropItem";
import { DragDropContext } from "react-beautiful-dnd";

export default function QuestionBox({ item, index, provided }) {
  const [isActiveTypeSelect, setIsActiveTypeSelect] = useState(false);
  const [isActiveToggleSwitch, setIsActiveToggleSwitch] = useState(false);
  const [questionTitle, setQuestionTitle] = useState(item.title);
  const [options, setOptions] = useState([...item.items]);
  const [showEtcOption, setShowEtcOption] = useState(item.etc);
  const [selectedQuestionType, setSelectedQuestionType] = useState(item.type);
  const selectedBox = useSelector((state) => state.selectedBox.value);
  const questionListItem = useSelector((state) => state.questionListItem.value);
  const [isEdited, setIsEdited] = useState(false);

  const handleQuestionTitleChange = (e) => {
    setQuestionTitle(e.target.value);
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
  const handleClick = (type) => {
    setSelectedQuestionType(type);
    setIsActiveTypeSelect(!isActiveTypeSelect);
    setIsEdited(true);
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
  const onDragEnd = (result) => {
    const { destination, source } = result;
    if (!destination) {
      return;
    }
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }
    const newOptions = [...options];
    const [removed] = newOptions.splice(source.index, 1);
    newOptions.splice(destination.index, 0, removed);
    setOptions(newOptions);
    setIsEdited(true);
  };

  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <QuestionBoxWrap
          ref={provided.innerRef}
          {...provided.draggableProps}
          onClick={() => {
            dispatch(setSelectedBox("QuestionBox"));
          }}
        >
          <NavigationBox addItem={addItem} />
          <h2 className="a11y-hidden">설문지 작성칸</h2>
          <QuestionBoxDragDiv {...provided.dragHandleProps} />
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
                    <button
                      type="button"
                      onClick={() => handleClick(type.name)}
                    >
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
            {selectedQuestionType === "객관식 질문" && (
              <QuestionDropItem
                selectedQuestionType={selectedQuestionType}
                options={options}
                setOptions={setOptions}
                setShowEtcOption={setShowEtcOption}
                showEtcOption={showEtcOption}
                setIsEdited={setIsEdited}
                type={"객관식 질문"}
                src={circle}
              />
            )}
            {selectedQuestionType === "체크박스" && (
              <QuestionDropItem
                selectedQuestionType={selectedQuestionType}
                options={options}
                setOptions={setOptions}
                setShowEtcOption={setShowEtcOption}
                showEtcOption={showEtcOption}
                setIsEdited={setIsEdited}
                type={"체크박스"}
                src={square}
              />
            )}
            {selectedQuestionType === "드롭다운" && (
              <QuestionDropItem
                selectedQuestionType={selectedQuestionType}
                options={options}
                setOptions={setOptions}
                setShowEtcOption={setShowEtcOption}
                showEtcOption={showEtcOption}
                setIsEdited={setIsEdited}
                type={"드롭다운"}
              />
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
                className={
                  isActiveToggleSwitch || item.required ? "active" : ""
                }
              >
                <ToggleButtonSpan />
              </ToggleSwitchDiv>
            </QuestionListIconDiv>
          </QuestionListSection>
        </QuestionBoxWrap>
      </DragDropContext>
    </>
  );
}
