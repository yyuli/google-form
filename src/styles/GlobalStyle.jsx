const { createGlobalStyle } = require("styled-components");
const { default: reset } = require("styled-reset");

export const GlobalStyle = createGlobalStyle`
  ${reset}
  :root {
    background-color: #f0ebf8;
    display: flex;
    justify-content: center;
    padding: 12px 0;
  }
  li{
    list-style:none;
  }
  img {
    vertical-align: top;
  }
  a {
    color: black;
    text-decoration: none;
  }
  input {
    box-sizing: border-box;
    border: 0;
    padding: 0;
    outline: 0;
  }
  button {
    border: 0;
    background-color: transparent;
    padding: 0;
  }

  .a11y-hidden {
    clip: rect(1px, 1px, 1px, 1px);
    clip-path: inset(50%);
    width: 1px;
    height: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
  }
`;
