import styled, { css, keyframes } from "styled-components";

const TitleBoxWrap = styled.article`
  display: flex;
  flex-direction: column;
  width: 768px;
  padding: 22px 24px 24px;
  background-color: #fff;
  border-radius: 8px;
  box-sizing: border-box;
  position: relative;
`;
const TitleBoxTopColor = styled.div`
  width: 100%;
  height: 10px;
  background-color: #673ab7;
  position: absolute;
  top: 0;
  left: 0;
  border-radius: 8px 8px 0 0;
  z-index: 1;
`;
const SelectedBoxLeftColor = styled.div`
  width: 6px;
  height: 100%;
  background-color: #4285f4;
  position: absolute;
  top: 0;
  left: 0;
  border-radius: 8px 0px 0 8px;
`;
const expandBorderBottom = keyframes`
  0% {
    width: 0;
  }
  100% {
    width: 100%;
  }
`;
const TitleForm = styled.form`
  position: relative;
`;
const CommonSpan = css`
  content: "";
  position: absolute;
  left: 50%;
  border-bottom: 2px solid #673ab7;
  transform: translateX(-50%);
`;
const AnimatedBorderTitleSpan = styled.span`
  ${CommonSpan}
  bottom: 35%;
`;
const AnimatedBorderDescSpan = styled.span`
  ${CommonSpan}
  bottom: 0;
`;
const CommonInput = css`
  border-bottom: ${({ isClicked }) => (isClicked ? "1px solid #0000001f" : "")};
  padding-top: ${({ isClicked }) => (isClicked ? "1px" : "")};
  &:focus + ${AnimatedBorderTitleSpan}, &:focus + ${AnimatedBorderDescSpan} {
    animation: ${expandBorderBottom} 0.4s forwards;
  }
`;
const TitleInput = styled.input`
  width: 100%;
  font-size: 32px;
  height: 48px;
  line-height: 48px;
  margin-top: 8px;
  ${CommonInput}
  &::placeholder {
    color: #70757a;
  }
`;
const TitleDesInput = styled.input`
  width: 100%;
  font-size: 14px;
  height: 21px;
  line-height: 21px;
  margin-top: 10px;
  ${CommonInput}
  &::placeholder {
    color: #70757a;
    font-size: 14px;
  }
`;

export {
  TitleBoxWrap,
  TitleBoxTopColor,
  SelectedBoxLeftColor,
  TitleForm,
  AnimatedBorderTitleSpan,
  AnimatedBorderDescSpan,
  TitleInput,
  TitleDesInput,
};
