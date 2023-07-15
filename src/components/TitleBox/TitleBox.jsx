import React, { useState } from "react";
import {
  TitleBoxWrap,
  TitleBoxTopColor,
  TitleBoxLeftColor,
  TitleForm,
  AnimatedBorderTitleSpan,
  AnimatedBorderDescSpan,
  TitleInput,
  TitleDesInput,
} from "./TitleBoxStyle";

export default function TitleBox() {
  const [isClicked, setIsClicked] = useState(false);

  return (
    <TitleBoxWrap
      onClick={() => {
        setIsClicked(true);
      }}
    >
      <h1 className="a11y-hidden">설문지명</h1>
      <TitleBoxTopColor />
      {isClicked ? <TitleBoxLeftColor /> : null}
      <TitleForm>
        <label htmlFor="title" className="a11y-hidden">
          설문지 제목
        </label>
        <TitleInput
          id="title"
          type="text"
          placeholder="제목 없는 설문지"
          isClicked={isClicked}
        />
        <AnimatedBorderTitleSpan />
        <label htmlFor="description" className="a11y-hidden">
          설문지 설명
        </label>
        <TitleDesInput
          id="description"
          placeholder="설문지 설명"
          isClicked={isClicked}
        />
        <AnimatedBorderDescSpan />
      </TitleForm>
    </TitleBoxWrap>
  );
}
