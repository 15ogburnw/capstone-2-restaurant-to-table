import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <div id="modals" />
      <body className="bg-base-accent">
        <Main />

        <NextScript />
        <div id="modal-root"></div>
      </body>
    </Html>
  );
}
