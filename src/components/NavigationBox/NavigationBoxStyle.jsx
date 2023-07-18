import styled from "styled-components";

export const NavigationBoxWrap = styled.section`
  width: 50px;
  border: 1px solid #dadce0;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  gap: 14px;
  background-color: #fff;
  padding: 14px 8px 12px;
  box-sizing: border-box;
  & > button {
    cursor: pointer;
  }
  position: absolute;
  top: 0;
  right: -65px;
`;
