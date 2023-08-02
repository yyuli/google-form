import React, { useState } from "react";
import {
  QuestionListDragDiv,
  AnimatedQuestionListSpan,
  AnimateQuestionListDiv,
  QuestionListInput,
  QuestionListRemoveBtn,
  QuestionListDiv,
  QuestionListEtcDiv,
  QuestionListAddDiv,
  QuestionListAddInput,
  QuestionListSpan,
  QuestionListAddBtn,
  QuestionListNumberSpan,
} from "../QuestionBox/QuestionBoxStyle";
import { Droppable, Draggable } from "react-beautiful-dnd";
import { QuestionType } from "../QuestionBox/QuestionBox";

interface QuestionDropItemProps {
  selectedQuestionType: QuestionType;
  options: string[];
  setOptions: (options: string[]) => void;
  setShowEtcOption: (state: boolean) => void;
  showEtcOption: boolean;
  setIsEdited: (edited: boolean) => void;
  type: string;
  src?: string;
}

export default function QuestionDropItem({
  selectedQuestionType,
  options,
  setOptions,
  setShowEtcOption,
  showEtcOption,
  setIsEdited,
  type,
  src,
}: QuestionDropItemProps) {
  const [hoverState, setHoverState] = useState(options.map(() => false));
  const handleMouseEnter = (index: number) => {
    setHoverState((prev) => prev.map((_, i) => (i === index ? true : false)));
  };
  const handleMouseLeave = () => {
    setHoverState(options.map(() => false));
  };
  const handleShowEtc = (state: boolean) => {
    setShowEtcOption(state);
    setIsEdited(true);
  };
  const handleQuestionItem = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const newOptions = [...options];
    newOptions[index] = e.target.value;
    setOptions(newOptions);
    setIsEdited(true);
  };
  const addOption = () => {
    const newOption = `옵션 ${options.length + 1}`;
    setOptions([...options, newOption]);
    setIsEdited(true);
  };
  const removeOption = (index: number) => {
    const removedOption = [...options];
    removedOption.splice(index, 1);
    setOptions(removedOption);
    setIsEdited(true);
  };
  return (
    <>
      <Droppable droppableId="droppable-2">
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            style={{
              height: `calc(48px * ${options.length})`,
            }}
          >
            {selectedQuestionType === type &&
              options.map((item, index) => (
                <Draggable
                  key={index}
                  draggableId={`draggable-2-${index}`}
                  index={index}
                >
                  {(provided, snapshot) => (
                    <QuestionListDiv
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      onMouseEnter={() => handleMouseEnter(index)}
                      onMouseLeave={() => handleMouseLeave()}
                      key={index}
                    >
                      <QuestionListDragDiv
                        {...provided.dragHandleProps}
                        visible={hoverState[index] ? "true" : "false"}
                      />
                      {selectedQuestionType === "드롭다운" ? (
                        <QuestionListNumberSpan>
                          {index + 1}
                        </QuestionListNumberSpan>
                      ) : null}
                      {selectedQuestionType === "드롭다운" ? null : (
                        <img src={src} alt="빈 라디오 버튼" />
                      )}
                      <AnimateQuestionListDiv>
                        <QuestionListInput
                          type="text"
                          value={item}
                          onChange={(e) => handleQuestionItem(e, index)}
                        />
                        <AnimatedQuestionListSpan />
                      </AnimateQuestionListDiv>
                      {options.length === 1 ? null : (
                        <QuestionListRemoveBtn
                          onClick={() => removeOption(index)}
                        />
                      )}
                    </QuestionListDiv>
                  )}
                </Draggable>
              ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      {selectedQuestionType !== "드롭다운" && showEtcOption && (
        <QuestionListDiv>
          <img src={src} alt="빈 라디오 버튼" />
          <QuestionListEtcDiv>
            <QuestionListInput type="text" placeholder="기타..." readOnly />
          </QuestionListEtcDiv>
          {options.length === 0 ? null : (
            <QuestionListRemoveBtn onClick={() => handleShowEtc(false)} />
          )}
        </QuestionListDiv>
      )}
      {selectedQuestionType === type && (
        <QuestionListAddDiv>
          {selectedQuestionType === "드롭다운" ? (
            <QuestionListNumberSpan>
              {options.length + 1}
            </QuestionListNumberSpan>
          ) : null}
          {selectedQuestionType === "드롭다운" ? null : (
            <img src={src} alt="빈 라디오 버튼" />
          )}
          <QuestionListAddInput
            placeholder="옵션 추가"
            onClick={addOption}
            readOnly
          />
          {selectedQuestionType !== "드롭다운" && !showEtcOption && (
            <>
              <QuestionListSpan>또는</QuestionListSpan>
              <QuestionListAddBtn onClick={() => handleShowEtc(true)}>
                '기타' 추가
              </QuestionListAddBtn>
            </>
          )}
        </QuestionListAddDiv>
      )}
    </>
  );
}
