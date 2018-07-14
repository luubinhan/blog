/* eslint import/no-unresolved:"off" */
/* eslint import/extensions:"off" */
/* eslint global-require:"off" */
import React from 'react'
import favi32 from './images/favi32.png'
import favi128 from './images/favi128.png'

let inlinedStyles = ''
if (process.env.NODE_ENV === 'production') {
  try {
    /* eslint import/no-webpack-loader-syntax: off */
    inlinedStyles = require('!raw-loader!../public/styles.css')
  } catch (e) {
    /* eslint no-console: "off" */
    console.log(e)
  }
}

export default class HTML extends React.Component {
  render() {
    let css
    if (process.env.NODE_ENV === 'production') {
      css = (
        <style
          id="gatsby-inlined-css"
          dangerouslySetInnerHTML={{ __html: inlinedStyles }}
        />
      )
    }
    return (
      <html lang="en">
        <head>
          <meta charSet="utf-8" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta name="theme-color" content="#01A1B1" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          {this.props.headComponents}
          <link rel="author" type="text/plain"  href="https://luubinhan.github.io/blog/humans.txt" />
          <link rel="stylesheet" type="text/css" href="https://unpkg.com/ionicons@4.2.4/dist/css/ionicons.min.css" />
          <link rel="icon" sizes="32x32" href={favi32} type="image/png" />
          <link rel="icon" sizes="180x180" href={favi128} type="image/png" />
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
    )
  }
}
