import React from 'react';
import PropTypes from 'prop-types';

const BUILD_TIME = new Date().getTime();

import favi32 from './pages/images/favi32.png'
import favi128 from './pages/images/favi128.png'

export default class HTML extends React.Component {
  static propTypes = {
    body: PropTypes.string,
  };

  render() {
    let css;
    if (process.env.NODE_ENV === 'production') {
      css = (
        <style
          dangerouslySetInnerHTML={{
            __html: require('!raw!../public/styles.css'),
          }}
        />
      );
    }

    return (
      <html lang="en">
        <head>
          <meta charSet="utf-8" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <link rel="icon" sizes="32x32" href={favi32} type="image/png" />
          <link rel="icon" sizes="180x180" href={favi128} type="image/png" />
          <link rel="author" type="text/plain"  href="https://luubinhan.github.io/blog/humans.txt" />
          <link rel="stylesheet" type="text/css" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"/>
          <link rel="stylesheet" type="text/css" href="https://code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css"/>
          <script></script>  
          {this.props.headComponents}
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
