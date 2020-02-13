import { Global, css } from "@emotion/core";

export function GlobalStyle() {
  return (
    <Global
      styles={css`
        * {
          margin: 0;
          padding: 0;
          font-family: "Helvetica Neue", "Helvetica",
            "Hiragino Kaku Gothic ProN", YuGothic, "Yu Gothic Medium", Meiryo,
            sans-serif;
          color: #233;
        }
        li {
          list-style: none;
        }
      `}
    />
  );
}
