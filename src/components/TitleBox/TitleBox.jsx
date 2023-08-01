import React, { useEffect } from "react";
import {
  TitleBoxWrap,
  TitleBoxTopColor,
  SelectedBoxLeftColor,
  TitleForm,
  AnimatedBorderTitleSpan,
  AnimatedBorderDescSpan,
  TitleInput,
  TitleDesInput,
  TitlePreviewDiv,
  TitleRequiredP,
  TitleBoxResultP,
} from "./TitleBoxStyle";
import { useSelector, useDispatch } from "react-redux";
import { setSelectedBox } from "../../store/selectedBoxSlice";
import { setTitle, setDescription } from "../../store/surveySlice";
import {
  addState,
  setQuestionListItem,
} from "../../store/questionListItemSlice";
import { increment } from "../../store/clickedIndexSlice";
import NavigationBox from "../NavigationBox/NavigationBox";

export default function TitleBox({ disabled, result, preview }) {
  const selectedBox = useSelector((state) => state.selectedBox.value);
  const { title, description } = useSelector((state) => state.survey);
  const questionListItem = useSelector((state) => state.questionListItem.value);
  const hasRequiredItem = questionListItem.some((item) => item.required);
  const dispatch = useDispatch();
  const handleClick = () => {
    if (disabled) return;
    dispatch(setSelectedBox("TitleBox"));
  };
  const addItem = () => {
    dispatch(setQuestionListItem(addState.value));
    dispatch(increment());
  };
  useEffect(() => {
    localStorage.setItem("title", title);
  }, [title]);
  useEffect(() => {
    localStorage.setItem("description", description);
  }, [description]);
  useEffect(() => {
    if (!questionListItem.length) {
      dispatch(setSelectedBox("TitleBox"));
    } else {
      dispatch(setSelectedBox("QuestionBox"));
    }
  }, [questionListItem, dispatch]);
  useEffect(() => {
    if (disabled && !title) {
      dispatch(setTitle("제목 없는 질문"));
    }
  }, [disabled, title, dispatch]);
  return (
    <TitleBoxWrap onClick={handleClick} result={result ? "true" : "false"}>
      {!questionListItem.length && !disabled ? (
        <NavigationBox addItem={addItem} />
      ) : null}
      <h2 className="a11y-hidden">설문지 제목</h2>
      <TitleBoxTopColor />
      {selectedBox === "TitleBox" && !disabled ? (
        <SelectedBoxLeftColor />
      ) : null}
      {!!result && (
        <TitleBoxResultP>응답은 수정할 수 없습니다.</TitleBoxResultP>
      )}
      <TitleForm>
        <label htmlFor="title" className="a11y-hidden">
          설문지 제목
        </label>
        <TitleInput
          id="title"
          type="text"
          placeholder="설문지 제목"
          selectedBox={selectedBox}
          value={title}
          onChange={(e) => dispatch(setTitle(e.target.value))}
          readOnly={disabled}
        />
        {disabled ? null : <AnimatedBorderTitleSpan />}
        <label htmlFor="description" className="a11y-hidden">
          설문지 설명
        </label>
        {disabled && !description ? null : (
          <TitleDesInput
            id="description"
            placeholder="설문지 설명"
            selectedBox={selectedBox}
            value={description}
            onChange={(e) => dispatch(setDescription(e.target.value))}
            readOnly={disabled}
          />
        )}
        {disabled ? null : <AnimatedBorderDescSpan />}
      </TitleForm>
      {disabled && hasRequiredItem ? (
        <>
          <TitlePreviewDiv
            preview={preview && !description ? "true" : "false"}
          />
          <TitleRequiredP result={result ? "true" : "false"}>
            * 표시는 필수 질문임
          </TitleRequiredP>
        </>
      ) : null}
    </TitleBoxWrap>
  );
}
