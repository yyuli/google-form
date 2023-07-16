import React, { useState } from "react";
import styled from "styled-components";
import dots from "../../assets/images/dots.svg";
import select from "../../assets/images/select.svg";

const QuestionBoxWrap = styled.article`
  width: 768px;
  background-color: #fff;
  border-radius: 8px;
  box-sizing: border-box;
  margin-top: 12px;
`;
const QuestionDragBtn = styled.button`
  background: url(${dots}) no-repeat center;
  background-color: transparent;
  border: 0;
  padding: 0;
  width: 100%;
  height: 24px;
  cursor: move;
`;
const QuestionTitleSection = styled.section`
  width: 100%;
  padding: 0 24px;
  box-sizing: border-box;
  display: flex;
`;
const QuestionTitleInput = styled.input`
  width: 448px;
  height: 56px;
  padding: 16px;
  box-sizing: border-box;
  font-size: 16px;
  color: #202124;
  background-color: #f8f9fa;
  border: 0;
  border-bottom: 1px solid #0000001f;
  margin-right: 60px;
  &:focus {
    outline: 0;
  }
  &:hover {
    background-color: #f2f3f4;
  }
`;

const QuestionTypeSelect = styled.div`
  width: 208px;
  position: relative;
  margin-bottom: 9px;
  > ul {
    display: none;
  }
  > button {
    width: 100%;
    height: 48px;
    line-height: 48px;
    border-radius: 4px;
    border: 1px solid #dbdce0;
    padding: 0 14px;
    font-size: 14px;
    text-align: left;
    background: none;

    &::after {
      content: "";
      display: block;
      width: 1em;
      height: 1em;
      margin-top: -0.5em;
      background: url(${select}) no-repeat center / 0.8em;
      position: absolute;
      top: 50%;
      right: 1.2em;
    }
  }
  &.active {
    > button::after {
      transform: rotate(180deg);
    }

    ul {
      display: block;
      z-index: 1;
    }
  }

  ul {
    border: 1px solid #c4c4c4;
    box-shadow: 4px 4px 14px rgba(0, 0, 0, 0.15);
    border-radius: 4px;
    position: absolute;
    top: 49px;
    left: 0;
    width: 100%;
    box-sizing: border-box;
    background-color: #fff;

    li button {
      width: 100%;
      height: 48px;
      line-height: 48px;
      text-align: left;
      padding: 0 14px;
      background: none;
      border: 0;
      font-size: 14px;

      &:hover {
        background: #eee;
      }
    }
  }
`;

export default function QuestionBox() {
  const [isActive, setIsActive] = useState(false);
  return (
    <QuestionBoxWrap>
      <h2 className="a11y-hidden">질문</h2>
      <QuestionDragBtn />
      <QuestionTitleSection>
        <QuestionTitleInput placeholder="질문" />
        <QuestionTypeSelect
          onClick={() => setIsActive(!isActive)}
          className={isActive ? "active" : ""}
        >
          <button type="button">객관식 질문</button>
          <ul>
            <li>
              <button type="button">단답형</button>
            </li>
            <li>
              <button type="button">장문형</button>
            </li>
            <li>
              <button type="button">객관식 질문</button>
            </li>
            <li>
              <button type="button">체크박스</button>
            </li>
            <li>
              <button type="button">드롭다운</button>
            </li>
          </ul>
        </QuestionTypeSelect>
      </QuestionTitleSection>
      <section></section>
    </QuestionBoxWrap>
  );
}
