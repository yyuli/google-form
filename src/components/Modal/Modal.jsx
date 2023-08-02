import React from "react";
import {
  ModalBackground,
  ModalWrapper,
  ModalTitle,
  ModalSubtitle,
  CloseBtn,
  ResetBtn,
  ModalBtnWrap,
} from "./ModalStyle";

export default function Modal({ closeModal, reset }) {
  const stopPropagation = (event) => {
    event.stopPropagation();
  };
  return (
    <ModalBackground onClick={closeModal}>
      <ModalWrapper onClick={stopPropagation}>
        <ModalTitle>양식을 지우시겠습니까?</ModalTitle>
        <ModalSubtitle>
          모든 질문에서 답변이 삭제되며 되돌릴 수 없습니다.
        </ModalSubtitle>
        <ModalBtnWrap>
          <CloseBtn type="button" onClick={closeModal}>
            취소
          </CloseBtn>
          <ResetBtn type="button" onClick={reset}>
            양식 지우기
          </ResetBtn>
        </ModalBtnWrap>
      </ModalWrapper>
    </ModalBackground>
  );
}
