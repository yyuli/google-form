import React, { useState, useEffect } from "react";
import circle from "../../assets/images/circle.svg";
import square from "../../assets/images/square.svg";
import copy from "../../assets/images/copy.svg";
import trash from "../../assets/images/trash.svg";
import { SelectedBoxLeftColor } from "../TitleBox/TitleBoxStyle";
import {
  QuestionBoxWrap,
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
  addState,
  setQuestionListItem,
} from "../../store/questionListItemSlice";
import QuestionDropItem from "../QuestionDropItem/QuestionDropItem";
import { DragDropContext } from "react-beautiful-dnd";
import { RootState } from "../../store/store";
import { ItemType } from "../QuestionList/QuestionList";

interface QuestionProps {
  item: ItemType;
  index: number;
  provided: any;
}
export type QuestionType =
  | "단답형"
  | "장문형"
  | "객관식 질문"
  | "체크박스"
  | "드롭다운";

export default function QuestionBox({ item, index, provided }: QuestionProps) {
  const [isActiveTypeSelect, setIsActiveTypeSelect] = useState(false);
  const [isRequired, setIsRequired] = useState(item.required);
  const [questionTitle, setQuestionTitle] = useState(item.title);
  const [options, setOptions] = useState([...item.items]);
  const [showEtcOption, setShowEtcOption] = useState(item.etc);
  const [selectedQuestionType, setSelectedQuestionType] =
    useState<QuestionType>(item.type as QuestionType);
  const [isEdited, setIsEdited] = useState(false);
  const selectedBox = useSelector(
    (state: RootState) => state.selectedBox.value
  );
  const questionListItem = useSelector(
    (state: RootState) => state.questionListItem.value
  );
  const dispatch = useDispatch();

  const handleQuestionTitleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setQuestionTitle(e.target.value);
    setIsEdited(true);
  };
  const addItem = () => {
    const addItems = {
      title: questionTitle,
      items: [...options],
      etc: showEtcOption,
      type: selectedQuestionType,
      required: isRequired,
    };
    const newItems = [
      ...questionListItem.slice(0, index),
      addItems,
      ...addState.value,
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
  const handleClick = (type: QuestionType) => {
    setSelectedQuestionType(type);
    setIsActiveTypeSelect(!isActiveTypeSelect);
    setIsEdited(true);
  };
  const questionTypes = [
    { name: "단답형" as QuestionType, id: "short" },
    { name: "장문형" as QuestionType, id: "long" },
    { name: "객관식 질문" as QuestionType, id: "multi" },
    { name: "체크박스" as QuestionType, id: "check" },
    { name: "드롭다운" as QuestionType, id: "drop" },
  ];
  const editItem = () => {
    const editItems = {
      title: questionTitle,
      items: [...options],
      etc: showEtcOption,
      type: selectedQuestionType,
      required: isRequired,
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
  const onDragEnd = (result: any) => {
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
                  setIsRequired(!isRequired);
                  setIsEdited(true);
                }}
              >
                필수
              </ToggleRequiredSpan>
              <ToggleSwitchDiv
                onClick={() => {
                  setIsRequired(!isRequired);
                  setIsEdited(true);
                }}
                className={isRequired || item.required ? "active" : ""}
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
