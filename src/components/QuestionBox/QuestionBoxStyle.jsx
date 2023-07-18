import styled, { css } from "styled-components";
import dots from "../../assets/images/dots.svg";
import select from "../../assets/images/select.svg";
import remove from "../../assets/images/delete.svg";
import {
  ExpandBorderBottom,
  CommonSpan,
} from "../../components/TitleBox/TitleBoxStyle";

const QuestionBoxWrap = styled.article`
  width: 768px;
  background-color: #fff;
  border-radius: 8px;
  box-sizing: border-box;
  margin-top: 12px;
  position: relative;
  border: 1px solid #dadce0;
`;
const CommonDrag = css`
  cursor: move;
  background: url(${dots}) no-repeat center 4px;
`;
const QuestionDragBtn = styled.button`
  width: 100%;
  height: 24px;
  ${CommonDrag};
`;
const QuestionTitleSection = styled.section`
  display: flex;
  width: 100%;
  padding: 0 24px;
  box-sizing: border-box;
  margin-bottom: 8px;
  position: relative;
`;
const AnimatedQuestionTitleSpan = styled.span`
  ${CommonSpan}
  bottom: 0;
`;
const AnimateQuestionTitleDiv = styled.div`
  position: relative;
  width: 448px;
  margin-right: 60px;
`;
const QuestionTitleInput = styled.input`
  width: 100%;
  height: 56px;
  padding: 16px;
  font-size: 16px;
  color: #202124;
  background-color: #f8f9fa;
  border-bottom: 1px solid #80858b;
  &:hover {
    background-color: #f2f3f4;
  }
  &:focus + ${AnimatedQuestionTitleSpan} {
    animation: ${ExpandBorderBottom} 0.4s forwards;
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
      font-size: 14px;
      &:hover {
        background: #eee;
      }
    }
  }
`;
const QuestionListSection = styled.section`
  width: 100%;
  padding: 0 24px;
  box-sizing: border-box;
  position: relative;
`;
const QuestionListDragBtn = styled.button`
  width: 27px;
  height: 27px;
  transform: rotate(90deg);
  ${CommonDrag};
  position: absolute;
  top: 5.5px;
  left: 2px;
`;
const AnimatedQuestionListSpan = styled.span`
  ${CommonSpan}
  bottom: 0;
`;
const AnimateQuestionListDiv = styled.div`
  position: relative;
  width: 594px;
  margin: 0 59px 0 10px;
`;
const QuestionListInput = styled.input`
  width: 100%;
  height: 39px;
  font-size: 14px;
  &:hover {
    padding-top: 1px;
    border-bottom: 1px solid #0000001f;
  }
  &:focus + ${AnimatedQuestionListSpan} {
    animation: ${ExpandBorderBottom} 0.4s forwards;
  }
`;
const QuestionListRemoveBtn = styled.button`
  width: 24px;
  height: 24px;
  background-image: url(${remove});
  background-position: center;
  background-repeat: no-repeat;
`;
const QuestionListAddInput = styled.input`
  width: 53px;
  height: 30px;
  margin: 0 6px 0 10px;
`;
const QuestionListDiv = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 8px;
  &:hover ${QuestionListAddInput} {
    padding-top: 1px;
    border-bottom: 1px solid #0000001f;
  }
`;
const QuestionListSpan = styled.span`
  font-size: 13.3px;
  color: #202124;
  padding-top: 1px;
`;
const QuestionListAddBtn = styled.button`
  color: #1a73e8;
  cursor: pointer;
  width: 75px;
  height: 36px;
  padding: 8px;
  &:hover {
    background-color: #f8fafe;
    border-radius: 1px;
  }
`;
const QuestionListIconDiv = styled.div`
  width: 100%;
  height: 65px;
  border-top: 1px solid #dadce0;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-top: 28px;
`;
const QuestionListIconBtn = styled.button`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  cursor: pointer;
  & > img {
    width: 20px;
  }
  &:hover {
    background-color: #f8f9fa;
  }
`;
const QuestionListLineSpan = styled.span`
  display: inline-block;
  width: 1px;
  height: 32px;
  background-color: #dadce0;
  margin: 0 20px 0 10px;
`;
const ToggleRequiredSpan = styled.span`
  display: inline-block;
  font-size: 14px;
  margin-right: 12px;
`;
const ToggleSwitchDiv = styled.div`
  width: 37px;
  height: 14px;
  display: block;
  position: relative;
  border-radius: 30px;
  background-color: #b9b9b9;
  cursor: pointer;
  transition: all 0.2s ease-in;

  &.active {
    background: #e1d8f1;
  }
`;
const ToggleButtonSpan = styled.span`
  width: 20px;
  height: 20px;
  position: absolute;
  top: 50%;
  left: 0;
  transform: translateY(-50%);
  border-radius: 50%;
  background: #fafafa;
  transition: all 0.2s ease-in;
  box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.4);
  ${ToggleSwitchDiv}.active & {
    position: absolute;
    left: calc(100% - 20px);
    background: #673ab7;
  }
`;

export {
  QuestionBoxWrap,
  QuestionDragBtn,
  QuestionTitleSection,
  AnimatedQuestionTitleSpan,
  AnimateQuestionTitleDiv,
  QuestionTitleInput,
  QuestionTypeSelect,
  QuestionListSection,
  QuestionListDragBtn,
  AnimatedQuestionListSpan,
  AnimateQuestionListDiv,
  QuestionListInput,
  QuestionListRemoveBtn,
  QuestionListAddInput,
  QuestionListDiv,
  QuestionListSpan,
  QuestionListAddBtn,
  QuestionListIconDiv,
  QuestionListIconBtn,
  QuestionListLineSpan,
  ToggleRequiredSpan,
  ToggleSwitchDiv,
  ToggleButtonSpan,
};