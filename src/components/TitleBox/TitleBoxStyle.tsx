import styled, { css, keyframes } from "styled-components";
interface CommonInputProps {
  selectedbox?: string;
  readOnly?: boolean;
}

const TitleBoxWrap = styled.article<{ result?: string }>`
  display: flex;
  flex-direction: column;
  width: 768px;
  padding: ${({ result }) =>
    result === "true" ? "22px 24px 16px" : "22px 24px 24px"};
  background-color: #fff;
  border-radius: 8px;
  box-sizing: border-box;
  position: relative;
  border: 1px solid #dadce0;
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
const TitleBoxResultP = styled.p`
  font-size: 12px;
  color: #70757a;
  margin: 4px 0px 2px;
`;
const ExpandBorderBottom = keyframes`
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
const CommonInput = css<CommonInputProps>`
  border-bottom: ${({ selectedbox, readOnly }) =>
    selectedbox === "TitleBox" && !readOnly ? "1px solid #0000001f" : ""};
  padding-top: ${({ selectedbox, readOnly }) =>
    selectedbox === "TitleBox" && !readOnly ? "1px" : ""};
  &:focus + ${AnimatedBorderTitleSpan}, &:focus + ${AnimatedBorderDescSpan} {
    animation: ${ExpandBorderBottom} 0.4s forwards;
  }
`;
const TitleInput = styled.input<CommonInputProps>`
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
const TitleDesInput = styled.input<CommonInputProps>`
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
const TitlePreviewDiv = styled.div<{ preview?: string }>`
  width: 768px;
  height: 1px;
  background-color: #dadce0;
  position: absolute;
  left: 0;
  top: ${({ preview }) => (preview === "true" ? "65%" : "70%")};
`;
const TitleRequiredP = styled.p<{ result?: string }>`
  color: #d93025;
  font-size: 14px;
  margin-top: ${({ result }) => (result === "true" ? "39px" : "24px")};
  padding: ${({ result }) => (result === "true" ? "0 0 6px 0" : "20px 0 0 0")};
`;

export {
  TitleBoxWrap,
  TitleBoxTopColor,
  SelectedBoxLeftColor,
  ExpandBorderBottom,
  TitleForm,
  CommonSpan,
  AnimatedBorderTitleSpan,
  AnimatedBorderDescSpan,
  TitleInput,
  TitleDesInput,
  TitlePreviewDiv,
  TitleRequiredP,
  TitleBoxResultP,
};
