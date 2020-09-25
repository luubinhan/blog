
export default class HTML extends React.Component {
  render() {
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
          <link
            rel="author"
            type="text/plain"
            href="http://vuilaptrinh.com/humans.txt"
          />
          <link rel="apple-touch-icon" href="https://luubinhan.github.io/blog/images/luckyluu_manifest_192.png" />

          <meta name="msapplication-TileImage" content="https://luubinhan.github.io/blog/images/luckyluu_manifest_192.png"/>
          <meta name="msapplication-TileColor" content="#01A1B1"/>

          <link rel="icon" sizes="32x32" href={favi32} type="image/png" />
          <link rel="icon" sizes="180x180" href={favi128} type="image/png" />
          <meta name="mobile-web-app-capable" content="yes"/>
          <meta name="apple-mobile-web-app-capable" content="yes"/>
          <meta name="application-name" content="vuilaptrinh.com"/>
          <meta name="apple-mobile-web-app-status-bar-style" content="black"/>
          <meta name="apple-mobile-web-app-title" content="vuilaptrinh"/>
          <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
          <script src="http://vuilaptrinh.com/facebookcomment.js"></script>
        </head>
      </html>
    );
  }
}
