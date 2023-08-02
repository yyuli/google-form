import styled from "styled-components";
import dots from "../../assets/images/dots.svg";
import { QuestionListDiv } from "../QuestionBox/QuestionBoxStyle";

const QuestionItemWrap = styled.article`
  width: 768px;
  background-color: #fff;
  border-radius: 8px;
  box-sizing: border-box;
  border: ${({ alert }) =>
    alert === "true" ? "1px solid #d93025" : "1px solid #dadce0"};
  margin: 12px 0;
  padding: 0 24px 24px;
`;
const QuestionItemDragDiv = styled.div`
  width: 100%;
  height: 28px;
  background-color: #fff;
  background: url(${dots}) no-repeat center 4px;
  visibility: ${({ isVisible }) => (isVisible ? "visible" : "hidden")};
`;
const QuestionItemTitle = styled.h3`
  height: ${({ title }) => (title === "false" ? "14px" : "32px")};
  font-size: 16px;
  margin-bottom: 2px;
`;
const QuestionItemLi = styled.li`
  height: 32px;
  display: flex;
  align-items: center;
  &:not(:first-of-type) {
    margin-top: 12px;
  }
`;
const QuestionItemP = styled.p`
  font-size: 14px;
  margin-left: 10px;
`;
const QuestionListWrapDiv = styled(QuestionListDiv)`
  margin-top: 4px;
`;
const QuestionItemRequiredSpan = styled.span`
  display: inline-block;
  color: #d93025;
  font-size: 18px;
  margin-left: 4px;
`;
export {
  QuestionItemWrap,
  QuestionItemDragDiv,
  QuestionItemTitle,
  QuestionItemLi,
  QuestionItemP,
  QuestionListWrapDiv,
  QuestionItemRequiredSpan,
};
