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

export default function TitleBox({ disabled }) {
  const selectedBox = useSelector((state) => state.selectedBox.value);
  const { title, description } = useSelector((state) => state.survey);
  const dispatch = useDispatch();
  const handleClick = () => {
    if (disabled) return;
    dispatch(setSelectedBox("TitleBox"));
  };
  useEffect(() => {
    localStorage.setItem("title", title);
  }, [title]);
  useEffect(() => {
    localStorage.setItem("description", description);
  }, [description]);

  return (
    <TitleBoxWrap onClick={handleClick}>
      <h2 className="a11y-hidden">설문지 제목</h2>
      <TitleBoxTopColor />
      {selectedBox === "TitleBox" ? <SelectedBoxLeftColor /> : null}
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
