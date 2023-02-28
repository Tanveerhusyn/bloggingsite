import { ThemeProvider } from "next-themes";
import Script from "next/script";
import "../css/tailwind.css";

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider attribute="class">
      <Script
    strategy="afterInteractive"
    src={`https://www.googletagmanager.com/gtag/js?id=G-TYEMN58EMB`}
/>
<Script id="google-analytics" strategy="afterInteractive">
    {`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-TYEMN58EMB');
    `}
</Script>

 

<Script
   id="Adsense-id"
   data-ad-client="ca-pub-7561344437486206"
   async="true"
   strategy="beforeInteractive"
    src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
/>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
