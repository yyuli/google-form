import styled, { css } from "styled-components";
import square from "../../assets/images/square.svg";
import squareChecked from "../../assets/images/square-checked.svg";
import circle from "../../assets/images/circle.svg";
import circleChecked from "../../assets/images/circle-checked.svg";
import alert from "../../assets/images/alert.svg";
import {
  QuestionListEtcDiv,
  QuestionListInput,
  QuestionListShortInput,
  QuestionListLongInput,
} from "../../components/QuestionBox/QuestionBoxStyle";
import {
  ExpandBorderBottom,
  CommonSpan,
} from "../../components/TitleBox/TitleBoxStyle";

const PreviewEtcDiv = styled(QuestionListEtcDiv)`
  display: flex;
  align-items: center;
`;
const PreviewEtcLabel = styled.label`
  display: block;
  font-size: 14px;
  width: 32px;
  margin-right: 20px;
`;
const AnimatedPreviewEtcSpan = styled.span`
  ${CommonSpan}
  bottom: 0;
`;
const AnimatePreviewEtcDiv = styled.div`
  position: relative;
  width: 593px;
  height: 24px;
`;
const PreviewEtcInput = styled(QuestionListInput)`
  border-bottom: 1px solid #0000001f;
  font-size: 16px;
  height: 24px;
  &:focus + ${AnimatedPreviewEtcSpan} {
    animation: ${ExpandBorderBottom} 0.4s forwards;
  }
`;
const CommonCustom = css`
  appearance: none;
  width: 20px;
  height: 20px;
  margin: 0;
  vertical-align: middle;
  transition: all 0.3s;
`;
const PreviewCustomInput = styled.input`
  ${CommonCustom}
  background: url(${square}) no-repeat center / 90%;
  &:checked {
    background-image: url(${squareChecked});
  }
`;
const PreviewCustomLabel = styled.label`
  font-size: 14px;
  margin-left: 10px;
`;
const PreviewCustomRadio = styled.input`
  ${CommonCustom}
  background: url(${circle}) no-repeat center / 90%;
  &:checked {
    background-image: url(${circleChecked});
  }
`;
const AnimatedPreviewShortSpan = styled.span`
  content: "";
  position: absolute;
  left: 50%;
  border-bottom: ${({ alert }) =>
    alert === "true" ? "2px solid #d93025" : "2px solid #673ab7"};
  transform: translateX(-50%);
  bottom: 0;
`;
const AnimatePreviewShortDiv = styled.div`
  position: relative;
  width: 360px;
  height: 24px;
`;
const PreviewShortInput = styled(QuestionListShortInput)`
  width: 100%;
  &:focus + ${AnimatedPreviewShortSpan} {
    animation: ${ExpandBorderBottom} 0.4s forwards;
  }
`;
const AnimatedPreviewLongSpan = styled.span`
  content: "";
  position: absolute;
  left: 50%;
  border-bottom: ${({ alert }) =>
    alert === "true" ? "2px solid #d93025" : "2px solid #673ab7"};
  transform: translateX(-50%);
  bottom: 0;
`;
const AnimatePreviewLongDiv = styled.div`
  position: relative;
  width: 612px;
  height: 24px;
`;
const PreviewLongInput = styled(QuestionListLongInput)`
  width: 100%;
  &:focus + ${AnimatedPreviewLongSpan} {
    animation: ${ExpandBorderBottom} 0.4s forwards;
  }
`;
const BtnWrap = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 12px;
`;
const SubmitBtn = styled.button`
  width: 73px;
  height: 36px;
  background-color: #673ab7;
  border-radius: 4px;
  font-size: 14px;
  color: #fff;
  cursor: pointer;
  padding: 0 24px;
`;
const ResetBtn = styled.button`
  height: 36px;
  color: #673ab7;
  cursor: pointer;
  border-radius: 4px;
  font-size: 14px;
  padding: 0 8px;
  &:hover {
    background-color: #e7e3f5;
  }
`;
const PreviewAlertP = styled.p`
  font-size: 12px;
  color: #d93025;
  height: 20px;
  line-height: 20px;
  margin-top: 20px;
  padding-left: 36px;
  background: url(${alert}) no-repeat;
  background-position: 2px center;
  background-size: 20px 20px;
`;

export {
  PreviewEtcDiv,
  PreviewEtcLabel,
  AnimatedPreviewEtcSpan,
  AnimatePreviewEtcDiv,
  PreviewEtcInput,
  PreviewCustomInput,
  PreviewCustomLabel,
  PreviewCustomRadio,
  AnimatedPreviewShortSpan,
  AnimatePreviewShortDiv,
  PreviewShortInput,
  AnimatedPreviewLongSpan,
  AnimatePreviewLongDiv,
  PreviewLongInput,
  BtnWrap,
  SubmitBtn,
  ResetBtn,
  PreviewAlertP,
};
