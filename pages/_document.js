// pages/_document.js
import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          {/* Ezoic privacy scripts — must load before the Ezoic header script below */}
          <script data-cfasync="false" src="https://cmp.gatekeeperconsent.com/min.js" />
          <script data-cfasync="false" src="https://the.gatekeeperconsent.com/cmp.min.js" />

          {/* Ezoic header script */}
          <script async src="//www.ezojs.com/ezoic/sa.min.js" />
          <script
            dangerouslySetInnerHTML={{
              __html: `
                window.ezstandalone = window.ezstandalone || {};
                ezstandalone.cmd = ezstandalone.cmd || [];
              `,
            }}
          />
          <script src="//ezoicanalytics.com/analytics.js" />

          <meta name="theme-color" content="#0ea5a6" />
          <link rel="icon" href="/favicon.ico" />
          <meta name="google-site-verification" content="8i0_dMKtuKPG0AA3-krcTT8YPdySMaY1g2VJNLDTn9s" />

          {/* Google Ads Conversion Tracking — loaded once, site-wide, instead of per-page */}
          <script async src="https://www.googletagmanager.com/gtag/js?id=AW-17753334820" />
          <script
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', 'AW-17753334820');
              `,
            }}
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