import styled from "styled-components";

const ModalBackground = styled.article`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 999;
  background-color: rgba(0, 0, 0, 0.3);
`;

const ModalWrapper = styled.div`
  display: inline-block;
  width: 373px;
  height: 144px;
  background-color: #fff;
  border-radius: 8px;
  padding: 24px 24px 8px 24px;
  box-sizing: border-box;
`;

const ModalTitle = styled.h2`
  font-size: 22px;
  font-weight: 500;
  margin-bottom: 18px;
`;

const ModalSubtitle = styled.h3`
  font-size: 16px;
`;

const CloseBtn = styled.button`
  height: 36px;
  font-size: 14px;
  cursor: pointer;
  color: #5f6368;
  &:hover {
    background-color: #f7f7f7;
  }
  padding: 0 8px;
  box-sizing: border-box;
  border-radius: 4px;
`;

const ResetBtn = styled.button`
  height: 36px;
  font-size: 14px;
  cursor: pointer;
  color: #5f6368;
  &:hover {
    background-color: #f7f7f7;
  }
  padding: 0 8px;
  box-sizing: border-box;
  border-radius: 4px;
`;
const ModalBtnWrap = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 18px;
  gap: 8px;
`;

export {
  ModalBackground,
  ModalWrapper,
  ModalTitle,
  ModalSubtitle,
  CloseBtn,
  ResetBtn,
  ModalBtnWrap,
};
