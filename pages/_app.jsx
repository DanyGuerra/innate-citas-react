import "../src/styles/globals.css";
import { ThemeProvider } from "theme-ui";
import theme from "../theme";
import Script from "next/script";
import { useState } from "react";

function MyApp({ Component, pageProps }) {
  const [precio, setPrecio] = useState(null);
  return (
    <>
      <Script
        src="https://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"
        strategy="lazyOnload"
      ></Script>
      <Script
        src="https://cdn.conekta.io/js/v1.0.1/conekta.js"
        strategy="lazyOnload"
      ></Script>
      <ThemeProvider theme={theme}>
        <Component {...pageProps} precio={precio} setPrecio={setPrecio} />
      </ThemeProvider>
    </>
  );
}

export default MyApp;
