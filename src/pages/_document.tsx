import Document, { Html, Head, Main, NextScript } from "next/document";
import { Global } from "@emotion/core";

class MyDocument extends Document {
  static async getInitialProps(ctx: any) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        <Head />
        <Global
          styles={{
            "*": {
              margin: 0,
              padding: 0,
            },
            html: {
              height: "100%",
            },
            body: {
              height: "100%",
            },
            "#__next": {
              height: "100%",
            },
          }}
        />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
