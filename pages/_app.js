import { ThemeProvider } from "next-themes";
import Script from "next/script";
import "../css/tailwind.css";
import GoogleAnalytics from "@bradgarropy/next-google-analytics"

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider attribute="class">
  <GoogleAnalytics measurementId="G-TYEMN58EMB" />
  <Script
   id="Adsense-id"
   data-ad-client="ca-pub-7561344437486206"
   async="true"
 
    src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
/>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
