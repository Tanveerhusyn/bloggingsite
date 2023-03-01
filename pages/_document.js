import Document, {
  Html,
  Head,
  Main,
  NextScript
} from "next/document";
import Script from "next/script";
class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link
            href="https://fonts.googleapis.com/css2?family=Inter:wght@300..700&display=swap"
            rel="stylesheet"
          />
          <link rel="icon" href="/img/fav.png" />
          <meta name="google-site-verification" content="iI0gf5P6YGdZkDHAavQvcBVVW3fD1OE2lDKyFu8uO5Q" />
          <Script
   id="Adsense-id"
   data-ad-client="ca-pub-7561344437486206"
   async="true"
   strategy="beforeInteractive"
    src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
/>
 


        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
