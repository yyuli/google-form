import React, { useState, useEffect } from "react";
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
} from "./TitleBoxStyle";
import { useSelector, useDispatch } from "react-redux";
import { setSelectedBox } from "../../store/selectedBoxSlice";
import { setTitle, setDescription } from "../../store/surveySlice";
import {
  initialState,
  setQuestionListItem,
} from "../../store/questionListItemSlice";
import NavigationBox from "../NavigationBox/NavigationBox";

export default function TitleBox({ disabled }) {
  const selectedBox = useSelector((state) => state.selectedBox.value);
  const { title, description } = useSelector((state) => state.survey);
  const questionListItem = useSelector((state) => state.questionListItem.value);
  const dispatch = useDispatch();
  const handleClick = () => {
    if (disabled) return;
    dispatch(setSelectedBox("TitleBox"));
  };
  const addItem = () => {
    dispatch(setQuestionListItem(initialState.value));
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

  console.log(selectedBox);
  return (
    <TitleBoxWrap onClick={handleClick}>
      {!questionListItem.length ? <NavigationBox addItem={addItem} /> : null}
      <h2 className="a11y-hidden">설문지 제목</h2>
      <TitleBoxTopColor />
      {selectedBox === "TitleBox" && !disabled ? (
        <SelectedBoxLeftColor />
      ) : null}
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
        <TitleDesInput
          id="description"
          placeholder="설문지 설명"
          selectedBox={selectedBox}
          value={description}
          onChange={(e) => dispatch(setDescription(e.target.value))}
          readOnly={disabled}
        />
        {disabled ? null : <AnimatedBorderDescSpan />}
      </TitleForm>
      {disabled ? (
        <>
          <TitlePreviewDiv />
          <TitleRequiredP>* 표시는 필수 질문임</TitleRequiredP>
        </>
      ) : null}
    </TitleBoxWrap>
  );
}
