/* eslint import/no-unresolved:"off" */
/* eslint import/extensions:"off" */
/* eslint global-require:"off" */
import React from "react";
import favi32 from "./images/favi32.png";
import favi128 from "./images/favi128.png";

let inlinedStyles = "";
if (process.env.NODE_ENV === "production") {
  try {
    /* eslint import/no-webpack-loader-syntax: off */
    inlinedStyles = require("!raw-loader!../public/styles.css");
  } catch (e) {
    /* eslint no-console: "off" */
    console.warn(e);
  }
}

export default class HTML extends React.Component {
  render() {
    let css;
    if (process.env.NODE_ENV === "production") {
      css = (
        <style
          id="gatsby-inlined-css"
          dangerouslySetInnerHTML={{ __html: inlinedStyles }}
        />
      );
    }
    return (
      <html lang="vi">
        <head>
          <meta charSet="utf-8" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta name="theme-color" content="#01A1B1" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <link rel="manifest" href="https://luubinhan.github.io/blog/manifest.json"/>
          {this.props.headComponents}
          <link
            rel="author"
            type="text/plain"
            href="https://luubinhan.github.io/blog/humans.txt"
          />
          <link rel="apple-touch-icon" href="https://luubinhan.github.io/blog/images/luckyluu_manifest_192.png" />

          <meta name="msapplication-TileImage" content="https://luubinhan.github.io/blog/images/luckyluu_manifest_192.png"/>
          <meta name="msapplication-TileColor" content="#01A1B1"/>

          <link rel="icon" sizes="32x32" href={favi32} type="image/png" />
          <link rel="icon" sizes="180x180" href={favi128} type="image/png" />
          <meta name="mobile-web-app-capable" content="yes"/>
          <meta name="apple-mobile-web-app-capable" content="yes"/>
          <meta name="application-name" content="luckyluu blog"/>
          <meta name="apple-mobile-web-app-status-bar-style" content="black"/>
          <meta name="apple-mobile-web-app-title" content="luckyluu"/>
          <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
          <script>
            (adsbygoogle = window.adsbygoogle || []).push({
              google_ad_client: "ca-pub-5409528808847700",
              enable_page_level_ads: true
            });
          </script>
          {css}
        </head>
        <body>
          <div
            id="___gatsby"
            dangerouslySetInnerHTML={{ __html: this.props.body }}
          />
          {this.props.postBodyComponents}
        </body>
      </html>
    );
  }
}
