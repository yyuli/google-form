import styled from "styled-components";

const QuestionItemWrap = styled.article`
  width: 768px;
  background-color: #fff;
  border-radius: 8px;
  box-sizing: border-box;
  border: 1px solid #dadce0;
  margin: 12px 0;
  padding: 0 24px;
`;
const QuestionItemDragDiv = styled.div`
  width: 100%;
  height: 24px;
  background-color: #fff;
`;
const QuestionItemTitle = styled.h3`
  height: 24px;
  font-size: 16px;
  margin-bottom: 8px;
`;
const QuestionItemLi = styled.li`
  height: 24px;
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;
const QuestionItemP = styled.p`
  font-size: 14px;
  margin-left: 10px;
`;

export {
  QuestionItemWrap,
  QuestionItemDragDiv,
  QuestionItemTitle,
  QuestionItemLi,
  QuestionItemP,
};
