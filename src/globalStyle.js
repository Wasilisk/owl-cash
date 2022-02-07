import {createGlobalStyle} from "styled-components";

const GlobalStyle = createGlobalStyle`
  body {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background: #20222A;
    font-family: Rubik, Open-Sans, sans-serif;
    
    & > div {
      width: 100%;
    }
  }
`;

export default GlobalStyle;