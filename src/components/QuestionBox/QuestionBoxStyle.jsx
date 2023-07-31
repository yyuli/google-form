import styled from "styled-components";
import dots from "../../assets/images/dots.svg";
import select from "../../assets/images/select.svg";
import remove from "../../assets/images/delete.svg";
import { ExpandBorderBottom, CommonSpan } from "../TitleBox/TitleBoxStyle";

const QuestionBoxWrap = styled.article`
  width: 768px;
  background-color: #fff;
  border-radius: 8px;
  box-sizing: border-box;
  margin-top: 12px;
  position: relative;
  border: 1px solid #dadce0;
`;
const QuestionBoxDragDiv = styled.div`
  height: 24px;
  background: url(${dots}) no-repeat center 4px;
`;
const QuestionTitleSection = styled.section`
  display: flex;
  width: 100%;
  padding: 0 24px;
  box-sizing: border-box;
  margin-bottom: 16px;
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
`;
const QuestionListDiv = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  height: 48px;
`;
const QuestionListDragDiv = styled.div`
  width: 27px;
  height: 27px;
  background: url(${dots}) no-repeat center 4px;
  position: absolute;
  top: 50%;
  left: -22px;
  transform: translateY(-50%) rotate(90deg);
  visibility: ${({ isVisible }) => (isVisible ? "visible" : "hidden")};
`;
const QuestionListNumberSpan = styled.span`
  font-size: 14px;
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
  height: 32px;
  font-size: 14px;
  &:hover {
    padding-top: 1px;
    border-bottom: 1px solid #0000001f;
  }
  &:focus + ${AnimatedQuestionListSpan} {
    animation: ${ExpandBorderBottom} 0.4s forwards;
  }
`;
const QuestionListShortInput = styled.input`
  width: 360px;
  height: 24px;
  font-size: 14px;
  border-bottom: 0.5px dashed #0000007e;
  margin-bottom: 14px;
`;
const QuestionListLongInput = styled.input`
  width: 612px;
  height: 24px;
  font-size: 14px;
  border-bottom: 0.5px dashed #0000007e;
  margin-bottom: 14px;
`;
const QuestionListEtcDiv = styled.div`
  width: 642px;
  margin-left: 10px;
  &:hover ${QuestionListInput} {
    padding-top: 0.5px;
    border-bottom: 0.5px dashed #0000007e;
  }
`;
const QuestionListRemoveBtn = styled.button`
  width: 48px;
  height: 48px;
  background-image: url(${remove});
  background-position: center;
  background-repeat: no-repeat;
  cursor: pointer;
  &:hover {
    background-color: #f8f9fa;
    border-radius: 50%;
  }
`;
const QuestionListAddInput = styled.input`
  width: 53px;
  height: 30px;
  margin: 0 6px 0 10px;
`;
const QuestionListAddDiv = styled.div`
  display: flex;
  align-items: center;
  margin-top: 6px;
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
  QuestionTitleSection,
  AnimatedQuestionTitleSpan,
  AnimateQuestionTitleDiv,
  QuestionTitleInput,
  QuestionTypeSelect,
  QuestionListSection,
  QuestionBoxDragDiv,
  QuestionListDragDiv,
  QuestionListNumberSpan,
  AnimatedQuestionListSpan,
  AnimateQuestionListDiv,
  QuestionListEtcDiv,
  QuestionListInput,
  QuestionListShortInput,
  QuestionListLongInput,
  QuestionListRemoveBtn,
  QuestionListAddInput,
  QuestionListDiv,
  QuestionListAddDiv,
  QuestionListSpan,
  QuestionListAddBtn,
  QuestionListIconDiv,
  QuestionListIconBtn,
  QuestionListLineSpan,
  ToggleRequiredSpan,
  ToggleSwitchDiv,
  ToggleButtonSpan,
};
