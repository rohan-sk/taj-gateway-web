/* eslint-disable @next/next/next-script-for-ga */
import Document, { DocumentContext, DocumentInitialProps, Head, Html, Main, NextScript } from "next/document"
import Script from "next/script"
import { ICONS, MANIFEST_FILE_PATH } from "../components/constants"

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext): Promise<DocumentInitialProps> {
    const initialProps = await Document.getInitialProps(ctx)

    return initialProps
  }
  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="manifest" href={MANIFEST_FILE_PATH} />
          <link rel="icon" href={ICONS?.TAJ_FAVICON} />
          <meta name="theme-color" content="#90cdf4" />
          <meta name="tdl-sso-client_id" content="IHCL-WEB-APP" />
          <Script
            async
            src="https://public.releases.juspay.in/hyper-sdk-web/HyperServices.js"
            strategy="afterInteractive"
          />
          <Script
            async
            id="chatbot"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `window.ymConfig = { bot:"${process.env.NEXT_PUBLIC_CHATBOT_ID}",host:"https://cloud.yellow.ai"}; (function() { var w = window, ic = w.YellowMessenger; if ("function" === typeof ic) ic("reattach_activator"), ic("update", ymConfig); else { var d = document, i = function() { i.c(arguments) }; function l() { var e = d.createElement("script"); e.type = "text/javascript", e.async = !0, e.src = "https://cdn.yellowmessenger.com/plugin/widget-v2/latest/dist/main.min.js"; var t = d.getElementsByTagName("script")[0]; t.parentNode.insertBefore(e, t) } i.q = [], i.c = function(e) { i.q.push(e) }, w.YellowMessenger = i, w.attachEvent ? w.attachEvent("onload", l) : w.addEventListener("load", l, !1)} })();
            `,
            }}
          />
          <Script
            strategy="beforeInteractive"
            async
            id="google_autocomplete"
            dangerouslySetInnerHTML={{
              __html: `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places&callback=initMap
            `,
            }}
          />

          <Script
            src={`${process.env.NEXT_PUBLIC_SSO_TDL_AUTHSCRIPT_DOMAIN}/v2/tdl-sso-auth.js`}
            async
            strategy="afterInteractive"></Script>

          <Script
            src={`https://www.google.com/recaptcha/enterprise.js?render=${process.env.NEXT_PUBLIC_RECAPTCHA_KEY}`}
            async
            strategy="afterInteractive"></Script>
          <Script
            src={`https://www.google.com/recaptcha/enterprise.js?render=${process.env.NEXT_PUBLIC_NOTIFICATION_RECAPTCHA_SITE_KEY}`}
            async
            strategy="afterInteractive"></Script>

          {/* Will uncomment Once triptease start integration  */}
          {/* <script
            src="https://onboard.triptease.io/bootstrap.js?integrationId=01DJT5CM1J8PQD0BRB65WVKJ2E"
            defer
            async
            crossOrigin="anonymous"
            type="text/javascript"></script> */}
          <Script
            async
            id="google_tag_manager"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_SIGNATURE}');
            `,
            }}
          />

          {process.env.NEXT_PUBLIC_ENVIRONMENT === "sit" && (
            <Script
              async
              id="marker_io_config"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `
              window.markerConfig = {
                project: '64586f5d22b098ac1e3c6fca',
                source: 'snippet'
              };
              `,
              }}
            />
          )}
          {process.env.NEXT_PUBLIC_ENVIRONMENT === "sit" && (
            <Script
              async
              id="marker_io_functions"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `
              !function(e,r,a){
                if(!e.__Marker){
                  e.__Marker={};var t=[],n={__cs:t};
                  ["show","hide","isVisible","capture","cancelCapture","unload","reload","isExtensionInstalled","setReporter","setCustomData","on","off"].forEach(
                    function(e){n[e]=function(){
                    var r=Array.prototype.slice.call(arguments);r.unshift(e),t.push(r)}}),
                    e.Marker=n;var s=r.createElement("script");
                    s.async=1,s.src="https://edge.marker.io/latest/shim.js";
                    var i=r.getElementsByTagName("script")[0];i.parentNode.insertBefore(s,i)}
                  }
                    (window,document);
              `,
              }}
            />
          )}
        </Head>
        <body>
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_SIGNATURE}`}
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}></iframe>
          </noscript>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
