import { createGlobalStyle } from "styled-components";
import { normalize } from "styled-normalize";

export const GlobalStyle = createGlobalStyle`
  ${normalize}

  * {
    font-family: "Helvetica Neue", "Helvetica",
      "Hiragino Kaku Gothic ProN", YuGothic, "Yu Gothic Medium", Meiryo,
      sans-serif;
    color: #233;
  }
  html {
    height: 100%;
  }
  body {
    height: 100%;
  }
  #__next {
    height: 100%;
  }
`;
