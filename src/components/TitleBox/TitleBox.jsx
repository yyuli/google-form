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
} from "./TitleBoxStyle";
import { useSelector, useDispatch } from "react-redux";
import { setSelectedBox } from "../../store/selectedBoxSlice";

export default function TitleBox() {
  const selectedBox = useSelector((state) => state.selectedBox.value);
  const dispatch = useDispatch();
  const [title, setTitle] = useState(
    localStorage.getItem("title") || "제목 없는 설문지"
  );
  const [description, setDescription] = useState(
    localStorage.getItem("description") || ""
  );
  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };
  const handleDesChange = (e) => {
    setDescription(e.target.value);
  };
  useEffect(() => {
    localStorage.setItem("title", title);
  }, [title]);
  useEffect(() => {
    localStorage.setItem("description", description);
  }, [description]);

  return (
    <TitleBoxWrap
      onClick={() => {
        dispatch(setSelectedBox("TitleBox"));
      }}
    >
      <h2 className="a11y-hidden">설문지명</h2>
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
          onChange={handleTitleChange}
        />
        <AnimatedBorderTitleSpan />
        <label htmlFor="description" className="a11y-hidden">
          설문지 설명
        </label>
        <TitleDesInput
          id="description"
          placeholder="설문지 설명"
          selectedBox={selectedBox}
          value={description}
          onChange={handleDesChange}
        />
        <AnimatedBorderDescSpan />
      </TitleForm>
    </TitleBoxWrap>
  );
}
